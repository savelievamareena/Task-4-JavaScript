import Command from "./Command";

export default class OperationOneOperand extends Command {
    signChange(a) {
        return a * -1;
    }

    percent(a) {
        if (a === 0) {
            return 0;
        }

        return a / 100;
    }

    root2(a) {
        return Math.sqrt(a);
    }

    root3(a) {
        return Math.cbrt(a);
    }

    factorial(a) {
        return a !== 1 ? a * this.factorial(a - 1) : 1;
    }

    exponentiation2(a) {
        return a * a;
    }

    exponentiation3(a) {
        return a * a * a;
    }

    tenPower(a) {
        return 10 ** a;
    }

    oneDivided(a) {
        if (a === 0) {
            throw new Error("Incorrect operation");
        } else {
            return 1 / a;
        }
    }

    execute(operation, number = 0) {
        if (!number) {
            throw new Error("Incorrect operation");
        }
        let num = parseFloat(number.replace(",", "."));

        return this[operation](num);
    }
}
