import OperationOneOperand from "./OperationOneOperand";
import OperationTwoOperands from "./OperationTwoOperands";
import Display from "./Display";
import Memento from "./Memento";

import operationsMap from "../../constants/operationsMap";
import actionsMap from "../../constants/actionsMap";
import memoryOpsMap from "../../constants/memoryOpsMap";

export default class Calculator {
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

    clearData() {
        this.pendingOperation = undefined;
        this.history = [];
    }

    processNumberClick(number) {
        if (this.isNewValue) {
            this.history.push(number);
            this.operationResult = 0;
            this.isNewValue = false;
        } else {
            const lastIndex = this.history.length - 1;
            this.history[lastIndex] =
                this.history[lastIndex] === "0"
                    ? number
                    : this.history[lastIndex] + number;
        }

        this.display.show(this.history[this.history.length - 1], true);
    }

    executeOperation(operator) {
        const operationTitle = operationsMap[operator];

        if (operationTitle === undefined) {
            throw new Error("Action does not exist");
        }

        this.isNewValue = true;
        if (this.pendingOperation === undefined || this.history.length < 2) {
            this.pendingOperation = operationTitle;

            return;
        }

        let result;
        try {
            result = this.operation.execute(
                this.pendingOperation,
                this.history[0],
                this.history[1]
            );
        } catch {
            this.display.show("Error");
            this.clearData();

            return;
        }

        this.operationResult = result;

        const resultAsString = result.toString().replace(".", ",");
        this.history = [resultAsString];
        this.display.show(resultAsString);

        if (operationTitle !== operationsMap["RES"]) {
            this.pendingOperation = operationTitle;
        } else {
            this.pendingOperation = undefined;
        }
    }

    processAction(action) {
        const actionTitle = actionsMap[action];

        if (actionTitle === undefined) {
            throw new Error("Action does not exist");
        }

        if (actionTitle === actionsMap["AC"]) {
            this.clearData();
            this.display.reset();
        }

        const historyLength = this.history.length;
        if (actionTitle === actionsMap["DEC"]) {
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

            this.display.show(this.history[this.history.length - 1], true);

            return;
        }

        if (
            actionTitle !== actionsMap["AC"] &&
            actionTitle !== actionsMap["DEC"]
        ) {
            let result;
            try {
                result = this.action.execute(
                    actionTitle,
                    this.history[historyLength - 1]
                );
            } catch (error) {
                this.display.show("Error");
                this.clearData();

                return;
            }

            this.operationResult = result;
            this.display.show(result.toString().replace(".", ","));

            if(isFinite(result)) {
                this.history[historyLength - 1] = result
                    .toString()
                    .replace(".", ",");
            }else {
                this.clearData();
            }
        }

        this.isNewValue = true;
    }

    handleMemoryOperation(memoryVal) {
        if (
            memoryVal === memoryOpsMap["M_ADD"] ||
            memoryVal === memoryOpsMap["M_SUB"]
        ) {
            this.display.activateMemoryIndicator();

            const valueToOperate =
                this.operationResult !== 0
                    ? this.operationResult
                    : this.history[this.history.length - 1];

            memoryVal === memoryOpsMap["M_ADD"]
                ? this.memento.addToState(valueToOperate)
                : this.memento.subFromState(valueToOperate);
        }

        if (memoryVal === memoryOpsMap["M_CLEAR"]) {
            this.display.deactivateMemoryIndicator();
            this.memento.clearState();
        }

        if (memoryVal === memoryOpsMap["M_RECALL"]) {
            this.display.show(
                this.memento.getState().toString().replace(".", ",")
            );
        }
    }
}
