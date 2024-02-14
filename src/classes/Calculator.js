import OperationOneOperand from "./OperationOneOperand";
import OperationTwoOperands from "./OperationTwoOperands";
import Display from "./Display";
import Memento from "./Memento";

export default class Calculator {
    operationsMap = {
        "+": "add",
        "-": "subtract",
        "x": "multiply",
        "/": "divide",
        "=": "result",
        "yrad": "rootY",
        "xy": "exponentiationY"
    };

    actionsMap = {
        "AC": "allClear",
        "+/-": "signChange",
        "%": "percent",
        "2rad": "root2",
        "3rad": "root3",
        "x!": "factorial",
        "x2": "exponentiation2",
        "x3": "exponentiation3",
        "10x": "tenPower",
        "1/x": "oneDivided",
        ",": "decimalPoint"
    };

    constructor() {
        this.history = [];
        this.isNewValue = true;
        this.pendingOperation = undefined;
        this.operationResult = 0;

        this.memento = new Memento();
    }

    display = new Display();
    operation = new OperationTwoOperands();
    action = new OperationOneOperand();

    processNumberClick(number) {
        if (this.isNewValue) {
            this.history.push(number);
            this.isNewValue = false;
            this.operationResult = 0;
        } else {
            if (this.history[this.history.length - 1] !== "0") {
                this.history[this.history.length - 1] += number;
            } else {
                this.history[this.history.length - 1] = number;
            }
        }

        this.display.show(
            this.history.length === 0
                ? "0"
                : this.history[this.history.length - 1],
            true
        );
    }

    executeOperation(operator) {
        const operationTitle = this.operationsMap[operator];

        if (operationTitle !== undefined) {
            if (this.pendingOperation === undefined) {
                this.pendingOperation = operationTitle;
            } else {
                if (this.history.length < 2) {
                    this.pendingOperation = operationTitle;
                } else {
                    let result = this.operation.execute(
                        this.pendingOperation,
                        this.history[0],
                        this.history[1]
                    );
                    this.history = [result.toString().replace(".", ",")];
                    this.display.show(result.toString().replace(".", ","));
                    this.operationResult = result;

                    if (operationTitle !== "result") {
                        this.pendingOperation = operationTitle;
                    } else {
                        this.history = [];
                    }
                }
            }
            this.isNewValue = true;
        } else {
            throw "Operation does not exist";
        }
    }

    processAction(action) {
        const actionTitle = this.actionsMap[action];

        if (actionTitle !== undefined) {
            if (actionTitle === "allClear") {
                this.pendingOperation = undefined;
                this.history = [];
                this.display.reset();
            } else if (actionTitle === "decimalPoint") {
                if (
                    this.history.length === 0 ||
                    this.history[this.history.length - 1] === "0"
                ) {
                    this.history.push("0,");
                } else {
                    if (
                        this.history[this.history.length - 1].indexOf(",") ===
                        -1
                    ) {
                        this.history[this.history.length - 1] += ",";
                    }
                }
                this.display.show(this.history[this.history.length - 1], true);
                this.isNewValue = false;
                return;
            } else {
                let result = this.action.execute(
                    actionTitle,
                    this.history[this.history.length - 1]
                );
                this.display.show(result.toString().replace(".", ","));

                if (
                    result !== 0 &&
                    (actionTitle === "signChange" || actionTitle === "percent")
                ) {
                    this.history[this.history.length - 1] = result
                        .toString()
                        .replace(".", ",");
                } else {
                    this.history = [];
                }
            }
            this.isNewValue = true;
        } else {
            console.log("Action does not exist");
        }
    }

    handleMemoryOperation(memoryVal) {
        if (memoryVal === "m+" || memoryVal === "m-") {
            this.display.activateMemoryIndicator();
            let valueToOperate;
            if (this.operationResult !== 0) {
                valueToOperate = this.operationResult;
            } else {
                valueToOperate = this.history[this.history.length - 1];
            }

            if (memoryVal === "m+") {
                this.memento.addToState(valueToOperate);
            } else {
                this.memento.subFromState(valueToOperate);
            }
        } else {
            if (memoryVal === "mc") {
                this.display.deactivateMemoryIndicator();
                this.memento.clearState();
            } else {
                this.display.show(
                    this.memento.getState().toString().replace(".", ",")
                );
            }
        }
    }
}
