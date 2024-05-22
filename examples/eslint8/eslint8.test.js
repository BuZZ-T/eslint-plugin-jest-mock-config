const someFoo = require('foo');

const test = require('./eslint8');

jest.mock('foo');

describe('eslint8', () => {
    it('should', () => {
        expect(test(1)).toBe('1');
    });

    it('should not', () => {
        expect(test(1)).toBe('2');
    });
});
