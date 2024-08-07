const someFoo = require('foo');

const test = require('./eslint7');

jest.mock('foo');


describe('eslint7', () => {
    it('should', () => {
        expect(test(1)).toBe('1');
    });

    it('should not', () => {
        expect(test(1)).not.toBe('2');
    });
});
