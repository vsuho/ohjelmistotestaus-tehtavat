import { divide } from "../src/calculator.js";

describe('divide', () => {
    it ('divides two positive numbers', () => {
        expect(divide(2, 1)).toBe(2/1);
    })

    it ('throws when first input is not a number', () => {
        expect(() => divide('2', 1)).toThrow('Both arguments must be numbers');
    });

    it ('throws when second input is not a number', () => {
        expect(() => divide(2, '1')).toThrow('Both arguments must be numbers');
    });

    it ('throws when first input is NaN', () => {
        expect(() => divide(NaN, 1)).toThrow('Arguments cannot be NaN');
    });

     it ('throws when second input is NaN', () => {
        expect(() => divide(2, NaN)).toThrow('Arguments cannot be NaN');
    });

    it ('throws when divided by zero', () => {
        expect(() => divide(2, 0)).toThrow('Division by zero is not allowed');
    });
});