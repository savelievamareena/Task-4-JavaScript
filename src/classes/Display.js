export default class Display {
    constructor() {
        this.domNode = document.querySelector(".display");
        this.memory = document.querySelector(".memory");
        this.show(0);
    }

    show(value) {
        let stringValue = value.toString();
        if(stringValue.length > 12) {
            stringValue = stringValue.substring(0, 12);
        }
        this.domNode.textContent = stringValue.replace('.', ',');
    }

    activateMemoryIndicator() {
        this.memory.textContent = "M";
    }

    deactivateMemoryIndicator() {
        this.memory.textContent = "";
    }

    reset() {
        this.show(0);
    }
}