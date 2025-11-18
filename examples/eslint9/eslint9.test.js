const someFoo = require('foo');
const test = require('./eslint9');

jest.mock('foo');

describe('eslint9', () => {

    it('should', () => {
        expect(test(1)).toBe('1');
    });

    it('should not', () => {
        expect(test(1)).toBe('2');
    });
});
