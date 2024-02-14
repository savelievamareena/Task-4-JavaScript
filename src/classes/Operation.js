import Command from "./Command";

export default class Operation extends Command {
    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b !== 0) {
            return a / b;
        } else {
            return "Error";
        }
    }

    rootY(a, b) {
        if (b !== 0) {
            return Math.pow(a, 1 / b);
        } else {
            return "Error";
        }
    }

    exponentiationY(a, b) {
        return a ** b;
    }

    execute(operation, ...args) {
        const parsedArgs = args.map((arg) => parseFloat(arg.replace(",", ".")));
        return this[operation](...parsedArgs);
    }
}
