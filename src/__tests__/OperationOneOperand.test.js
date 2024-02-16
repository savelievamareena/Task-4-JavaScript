import { beforeEach, describe, expect, test } from "@jest/globals";
import OperationOneOperand from "../classes/OperationOneOperand";

describe("OperationOneOperand", () => {
    let action;

    beforeEach(() => {
        action = new OperationOneOperand();
    });

    test("changes sign of a number", () => {
        expect(action.signChange(-5)).toBe(5);
        expect(action.signChange(4)).toBe(-4);
    });

    test("calculates percentage of a number", () => {
        expect(action.percent(100)).toBe(1);
        expect(action.percent(50)).toBe(0.5);
    });

    test("calculates square root of a number", () => {
        expect(action.root2(4)).toBe(2);
        expect(action.root2(9)).toBe(3);
    });

    test("calculates cube root of a number", () => {
        expect(action.root3(8)).toBe(2);
        expect(action.root3(27)).toBe(3);
    });

    test("calculates factorial of a number", () => {
        expect(action.factorial(5)).toBe(120);
        expect(action.factorial(3)).toBe(6);
    });

    test("calculates square of a number", () => {
        expect(action.exponentiation2(3)).toBe(9);
        expect(action.exponentiation2(4)).toBe(16);
    });

    test("calculates cube of a number", () => {
        expect(action.exponentiation3(2)).toBe(8);
        expect(action.exponentiation3(3)).toBe(27);
    });

    test("calculates ten to the power of a number", () => {
        expect(action.tenPower(2)).toBe(100);
        expect(action.tenPower(3)).toBe(1000);
        expect(action.tenPower(0)).toBe(1);
    });

    test("calculates reciprocal of a number", () => {
        expect(action.oneDivided(2)).toBe(0.5);
        expect(action.oneDivided(4)).toBe(0.25);
        expect(() => {
            action.oneDivided(0);
        }).toThrow(new Error("Incorrect operation"));
    });
});
