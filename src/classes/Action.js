import Command from "./Command";

export default class Action extends Command {
    signChange(a){
        return a * -1;
    }

    percent(a) {
        if(a === 0) {
            return 0;
        }else {
            return a / 100;
        }
    }

    root2(a) {
        return Math.sqrt(a);
    }

    root3(a) {
        return Math.cbrt(a);
    }

    factorial(a) {
        return (a !== 1) ? a * this.factorial(a - 1) : 1;
    }

    exponentiation2(a) {
        return a * a;
    }

    exponentiation3(a) {
        return a * a * a;
    }

    tenPower(a) {
        if(a === 0) {
            return 10 ** 0;
        }else {
            return 10 ** a;
        }
    }

    oneDivided(a) {
        if(a === 0) {
            return "Error";
        }else {
            return 1 / a;
        }
    }

    execute(operation, number = "") {
        if(typeof number !== "string" && typeof number !== "number") {
            return "Error";
        }else {
            if(number === "") {
                number = 0;
            }
            let num = parseFloat(number);
            return this[operation](num);
        }
    }
}