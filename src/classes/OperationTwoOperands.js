import Command from "./Command";

export default class OperationTwoOperands extends Command {
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
        if (b === 0) {
            throw new Error("Incorrect operation");
        }

        return a / b;
    }

    rootY(a, b) {
        if (b === 0) {
            throw new Error("Incorrect operation");
        }

        return Math.pow(a, 1 / b);
    }

    exponentiationY(a, b) {
        return a ** b;
    }

    execute(operation, ...args) {
        const parsedArgs = args.map((arg) => {
            if (!arg) {
                throw new Error("Incorrect operation");
            }
            return parseFloat(arg.replace(",", "."));
        });

        return this[operation](...parsedArgs);
    }
}
