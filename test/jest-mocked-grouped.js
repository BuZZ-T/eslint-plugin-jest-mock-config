'use strict';

const { RuleTester } = require('eslint');
const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const ruleName = 'jest-mocked-grouped';

tester.run(ruleName, require(`../rules/${ruleName}`), {
    valid: [
        {
            name: 'no jest.mocked',
            code: `const foo = getFoo();`,
        },
        {
            name: 'Only one jest.mock path',
            code: `const someMock = jest.mocked('some-path');`,
        },
        {
            name: 'Multiple jest.mock paths',
            code: `const someObject = jest.mocked('someObject');
                   const someOtherObject = jest.mocked('someOtherObject');`,
        },
    ],
    invalid: [
        {
            code: `const someObjectMock = jest.mocked('someObject');
                   const foo = getFoo();
                   const someObjectOtherMock = jest.mocked(someObjectOtherMock);`,
            errors: [{ message: 'jest.mocked should directly follow another jest.mocked' }],
            name: 'one statement line in between',
        },
        {
            code: `const someObjectMock = jest.mocked(someObjectMock);
                   const someOtherObjectMock = jest.mocked(someOtherObjectMock);
                   const foo= getFoo();
                   const someThirdObjectMock = jest.mocked(someThirdObjectMock);`,
            errors: [{ message: 'jest.mocked should directly follow another jest.mocked' }],
            name: 'two and one jest.mocked with one statement line in between',
        },
    ],
});
