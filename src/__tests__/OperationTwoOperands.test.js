import { beforeEach, describe, expect, test } from "@jest/globals";
import OperationTwoOperands from "../classes/OperationTwoOperands";

describe("OperationTwoOperands", () => {
    let operation;

    beforeEach(() => {
        operation = new OperationTwoOperands();
    });

    test("adds two numbers", () => {
        expect(operation.add(1, 2)).toBe(3);
        expect(operation.add(-5, 0)).toBe(-5);
    });

    test("subtracts two numbers", () => {
        expect(operation.subtract(5, 3)).toBe(2);
        expect(operation.subtract(100, -5)).toBe(105);
    });

    test("multiplies two numbers", () => {
        expect(operation.multiply(4, 5)).toBe(20);
        expect(operation.multiply(100, 0)).toBe(0);
    });

    test("divides two numbers", () => {
        expect(operation.divide(10, 2)).toBe(5);
        expect(() => {
            operation.divide(10, 0);
        }).toThrowError("Incorrect operation");
    });

    test("calculates the y root of x", () => {
        expect(operation.rootY(27, 3)).toBeCloseTo(3);
        expect(() => {
            operation.rootY(16, 0);
        }).toThrowError("Incorrect operation");
    });

    test("calculates x raised to the power of y", () => {
        expect(operation.exponentiationY(2, 3)).toBe(8);
        expect(operation.exponentiationY(1, 0)).toBe(1);
    });
});
