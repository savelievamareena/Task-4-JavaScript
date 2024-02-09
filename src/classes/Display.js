export default class Display {
    constructor() {
        this.domNode = document.querySelector(".display");
        this.show(0);
    }

    show(value) {
        this.domNode.textContent = value;
    }

    reset() {
        this.show(0);
    }
}