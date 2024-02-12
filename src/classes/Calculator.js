import Operation from "./Operation";
import Display from "./Display";
import Memento from "./Memento";
import Action from "./Action";

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
        "1/x": "oneDivided"
    }

    constructor() {
        this.history = [];
        this.isNewValue = true;
        this.pendingOperation = undefined;
        this.operationResult = 0;

        this.memento = new Memento();
    }

    display = new Display();
    operation = new Operation();
    action = new Action();

    processNumberClick(number) {
        if(this.isNewValue) {
            if(number !== "0") {
                this.history.push(number);
                this.isNewValue = false;
                this.operationResult = 0;
            }
        }else {
            this.history[this.history.length - 1] += number.toString();
        }

        this.display.show(this.history.length === 0 ? 0 : this.history[this.history.length - 1] );
    }

    executeOperation(operator) {
        const operationTitle = this.operationsMap[operator];

        if(operationTitle !== undefined) {
            if(this.pendingOperation === undefined || operationTitle !== "result") {
                this.pendingOperation = operationTitle;
            }else {
                if(this.history.length === 2) {
                    let result = this.operation.execute(this.pendingOperation, this.history[0], this.history[1]);
                    this.display.show(result);
                    this.operationResult = result;

                    if(operationTitle !== "result") {
                        this.pendingOperation = operationTitle;
                    }else {
                        this.history = [];
                    }
                }else {
                    console.log("You have only one number in history");
                }
            }
            this.isNewValue = true;
        }else {
            console.log("Operation does not exist");
        }
    }

    processAction(action) {
        const actionTitle = this.actionsMap[action];

        if(actionTitle !== undefined) {
            let result = this.action.execute(actionTitle, this.history[this.history.length - 1]);
            this.display.show(result);

            if(actionTitle === "signChange" || actionTitle === "percent") {
                this.history[this.history.length - 1] = result;
            }else {
                this.history = [];
            }

            this.isNewValue = true;
        }else {
            console.log("Action does not exist");
        }
    }

    handleMemoryOperation(memoryVal) {
        if(memoryVal === "m+" || memoryVal === "m-") {
            this.display.activateMemoryIndicator();
            let valueToOperate;
            if(this.operationResult !== 0) {
                valueToOperate = this.operationResult;
            }else {
                valueToOperate = this.history[this.history.length - 1];
            }

            if(memoryVal === "m+") {
                this.memento.addToState(valueToOperate);
            }else {
                this.memento.subFromState(valueToOperate);
            }
        }else {
            if(memoryVal === "mc") {
                this.display.deactivateMemoryIndicator();
                this.memento.clearState();
            }else {
                this.display.show(this.memento.getState());
            }
        }
    }
}