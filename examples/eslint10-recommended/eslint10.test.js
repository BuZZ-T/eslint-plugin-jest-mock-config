const someFoo = require('foo');
const test = require('./eslint10');

jest.mock('foo');

describe('eslint10', () => {

    it('should', () => {
        expect(test(1)).toBe('1');
    });

    it('should not', () => {
        expect(test(1)).toBe('2');
    });
});
