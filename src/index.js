import "./index.css";
import Calculator from "./classes/Calculator";

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector("#toggle");
    const rootElement = document.body;

    toggle.addEventListener("click", function () {
        rootElement.classList.toggle("light-theme");
    });

    //main functionality
    const calculator = new Calculator();

    const numbers = document.querySelectorAll(".calc_row button.number");
    const operators = document.querySelectorAll(".calc_row button.operator");
    const actions = document.querySelectorAll(".calc_row button.action");
    const memoryKeys = document.querySelectorAll(".calc_row button.memory");

    numbers.forEach((num) => {
        num.addEventListener("click", function () {
            const numValue = num.dataset.key;
            calculator.processNumberClick(numValue);
        });
    });

    operators.forEach((operator) => {
        operator.addEventListener("click", function () {
            const operatorValue = operator.dataset.key;
            calculator.executeOperation(operatorValue);
        });
    });

    actions.forEach((action) => {
        action.addEventListener("click", function () {
            const actionValue = action.dataset.key;
            calculator.processAction(actionValue);
        });
    });

    memoryKeys.forEach((memoryKey) => {
        memoryKey.addEventListener("click", function () {
            const memoryValue = memoryKey.dataset.key;
            calculator.handleMemoryOperation(memoryValue);
        });
    });
});
