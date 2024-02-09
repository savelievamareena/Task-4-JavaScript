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
        return a - b;
    }

    execute(operation, ...args) {
        const parsedArgs = args.map(arg => parseInt(arg, 10));
        return this[operation](...parsedArgs);
    }
}