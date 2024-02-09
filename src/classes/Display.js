export default class Display {
    constructor() {
        this.domNode = document.querySelector(".display");
        this.show(0);
    }

    show(value) {
        let stringValue = value.toString();
        if(stringValue.length > 10) {
            stringValue = stringValue.substring(0, 11);
        }
        this.domNode.textContent = stringValue.replace('.', ',');
    }

    reset() {
        this.show(0);
    }
}