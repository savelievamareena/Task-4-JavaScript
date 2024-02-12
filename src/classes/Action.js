import Command from "./Command";

export default class Action extends Command {
    allClear(){
        return 0;
    }

    signChange(a){
        return a * -1;
    }

    percent(a) {
        return a / 100;
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
        if(isNaN(a)) {
            return 10 ** 0;
        }else {
            return 10 ** a;
        }
    }

    oneDivided(a) {
        if(isNaN(a)) {
            return "Error";
        }else {
            return 1 / a;
        }
    }

    execute(operation, number = "") {
        let num = parseInt(number, 10);
        return this[operation](num);
    }
}