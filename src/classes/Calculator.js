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
        this.display = new Display();
        this.operation = new OperationTwoOperands();
        this.action = new OperationOneOperand();
    }

    processNumberClick(number) {
        if (this.isNewValue) {
            this.history.push(number);
            this.operationResult = 0;
            this.isNewValue = false;
        } else {
            let lastIndex = this.history.length - 1;
            this.history[lastIndex] =
                this.history[lastIndex] === "0"
                    ? number
                    : this.history[lastIndex] + number;
        }

        this.display.show(this.history[this.history.length - 1], true);
    }

    executeOperation(operator) {
        const operationTitle = this.operationsMap[operator];

        if (operationTitle === undefined) {
            throw new Error("Action does not exist");
        }

        this.isNewValue = true;
        if (this.pendingOperation === undefined || this.history.length < 2) {
            this.pendingOperation = operationTitle;
            return;
        }

        let result = this.operation.execute(
            this.pendingOperation,
            this.history[0],
            this.history[1]
        );
        this.operationResult = result;

        let resultAsString = result.toString().replace(".", ",");
        this.history = [resultAsString];
        this.display.show(resultAsString);

        if (operationTitle !== "result") {
            this.pendingOperation = operationTitle;
        } else {
            this.history = [];
        }
    }

    processAction(action) {
        const actionTitle = this.actionsMap[action];

        if (actionTitle === undefined) {
            throw new Error("Action does not exist");
        }

        let historyLength = this.history.length;

        if (actionTitle === "allClear") {
            this.pendingOperation = undefined;
            this.history = [];
            this.display.reset();
        }

        if (actionTitle === "decimalPoint") {
            if (historyLength === 0 || this.isNewValue) {
                this.history.push("0,");
                this.isNewValue = false;
            }

            if (
                historyLength !== 0 &&
                this.history[historyLength - 1].indexOf(",") === -1
            ) {
                this.history[historyLength - 1] += ",";
            }

            this.display.show(this.history[historyLength - 1], true);
            return;
        }

        if (actionTitle !== "allClear" && actionTitle !== "decimalPoint") {
            let result = this.action.execute(
                actionTitle,
                this.history[historyLength - 1]
            );
            this.operationResult = result;
            this.display.show(result.toString().replace(".", ","));

            if (actionTitle === "signChange" || actionTitle === "percent") {
                this.history[historyLength - 1] = result
                    .toString()
                    .replace(".", ",");
            } else {
                this.history = [];
            }
        }

        this.isNewValue = true;
    }

    handleMemoryOperation(memoryVal) {
        if (memoryVal === "m+" || memoryVal === "m-") {
            this.display.activateMemoryIndicator();

            let valueToOperate =
                this.operationResult !== 0
                    ? this.operationResult
                    : this.history[this.history.length - 1];

            memoryVal === "m+"
                ? this.memento.addToState(valueToOperate)
                : this.memento.subFromState(valueToOperate);
        }

        if (memoryVal === "mc") {
            this.display.deactivateMemoryIndicator();
            this.memento.clearState();
        }

        if (memoryVal === "mr") {
            this.display.show(
                this.memento.getState().toString().replace(".", ",")
            );
        }
    }
}
