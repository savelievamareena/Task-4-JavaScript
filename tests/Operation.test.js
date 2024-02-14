import {beforeEach, describe, expect, test} from '@jest/globals';
import OperationTwoOperands from "../src/classes/OperationTwoOperands";

describe('Operation', () => {
    let operation;

    beforeEach(() => {
        operation = new OperationTwoOperands();
    });

    test('adds two numbers', () => {
        expect(operation.execute('add', 1, 2)).toBe(3);
        expect(operation.execute('add', -5, 0)).toBe(-5);
    });

    test('subtracts two numbers', () => {
        expect(operation.execute('subtract', 5, 3)).toBe(2);
        expect(operation.execute('subtract', 100, -5)).toBe(105);
    });

    test('multiplies two numbers', () => {
        expect(operation.execute('multiply', 4, 5)).toBe(20);
        expect(operation.execute('multiply', 100, 0)).toBe(0);
    });

    test('divides two numbers', () => {
        expect(operation.execute('divide', 10, 2)).toBe(5);
        expect(operation.execute('divide', 10, 0)).toBe('Error');
    });

    test('calculates the y root of x', () => {
        expect(operation.execute('rootY', 27, 3)).toBeCloseTo(3);
        expect(operation.execute('rootY', 16, 0)).toBe('Error');
    });

    test('calculates x raised to the power of y', () => {
        expect(operation.execute('exponentiationY', 2, 3)).toBe(8);
        expect(operation.execute('exponentiationY', 1, 0)).toBe(1);
    });
});