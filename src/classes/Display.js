export default class Display {
    constructor() {
        this.domNode = document.querySelector(".display");
        this.memory = document.querySelector(".memory");
        this.show("0");
    }

    show(value, isTrailingZeroesOK = false) {
        if((value !== "" && value.endsWith(",")) || isTrailingZeroesOK) {
            this.domNode.textContent = value;
        }else {
            let valFixedDots = value.replace(',', '.');
            let valAsNum = parseFloat(valFixedDots);
            let withoutTrailingZeroes = 1 * valAsNum.toFixed(10);
            this.domNode.textContent = withoutTrailingZeroes.toString().replace('.', ',');
        }
    }

    activateMemoryIndicator() {
        this.memory.textContent = "M";
    }

    deactivateMemoryIndicator() {
        this.memory.textContent = "";
    }

    reset() {
        this.show("0");
    }
}