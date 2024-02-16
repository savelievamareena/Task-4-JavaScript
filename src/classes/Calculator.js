import OperationOneOperand from "./OperationOneOperand";
import OperationTwoOperands from "./OperationTwoOperands";
import Display from "./Display";
import Memento from "./Memento";

import OPERATIONS_MAP from "../constants/OPERATIONS_MAP";
import ACTIONS_MAP from "../constants/ACTIONS_MAP";
import MEMORY_OPS_MAP from "../constants/MEMORY_OPS_MAP";

export default class Calculator {
    constructor() {
        this.history = [];
        this.isNewValue = true;
        this.pendingOperation = null;
        this.operationResult = 0;

        this.memento = new Memento();
        this.display = new Display();
        this.operation = new OperationTwoOperands();
        this.action = new OperationOneOperand();
    }

    clearData() {
        this.pendingOperation = null;
        this.history = [];
    }

    processNumberClick(number) {
        if (this.isNewValue) {
            !this.pendingOperation //check if we clicked = before
                ? (this.history = [number])
                : this.history.push(number);
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
        const operationTitle = OPERATIONS_MAP[operator];

        if (!operationTitle) {
            throw new Error("Action does not exist");
        }

        this.isNewValue = true;
        if (!this.pendingOperation || this.history.length < 2) {
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

        if (operationTitle !== OPERATIONS_MAP.RES) {
            this.pendingOperation = operationTitle;
        } else {
            this.pendingOperation = null;
        }
    }

    processAction(action) {
        const actionTitle = ACTIONS_MAP[action];

        if (!actionTitle) {
            throw new Error("Action does not exist");
        }

        if (actionTitle === ACTIONS_MAP.AC) {
            this.clearData();
            this.display.reset();
        }

        const historyLength = this.history.length;
        if (actionTitle === ACTIONS_MAP.DEC) {
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

        if (actionTitle !== ACTIONS_MAP.AC && actionTitle !== ACTIONS_MAP.DEC) {
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

            if (isFinite(result)) {
                this.history[historyLength - 1] = result
                    .toString()
                    .replace(".", ",");
            } else {
                this.clearData();
            }
        }

        this.isNewValue = true;
    }

    handleMemoryOperation(memoryVal) {
        if (
            memoryVal === MEMORY_OPS_MAP.M_ADD ||
            memoryVal === MEMORY_OPS_MAP.M_SUB
        ) {
            this.display.activateMemoryIndicator();

            const valueToOperate =
                this.operationResult !== 0
                    ? this.operationResult
                    : this.history[this.history.length - 1];

            memoryVal === MEMORY_OPS_MAP.M_ADD
                ? this.memento.addToState(valueToOperate)
                : this.memento.subFromState(valueToOperate);
        }

        if (memoryVal === MEMORY_OPS_MAP.M_CLEAR) {
            this.display.deactivateMemoryIndicator();
            this.memento.clearState();
        }

        if (memoryVal === MEMORY_OPS_MAP.M_RECALL) {
            this.display.show(
                this.memento.getState().toString().replace(".", ",")
            );
        }
    }
}
