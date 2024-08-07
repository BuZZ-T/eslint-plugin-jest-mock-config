'use strict';

const { RuleTester } = require('eslint');
const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const ruleName = 'jest-mock-grouped';

tester.run(ruleName, require(`../rules/${ruleName}`), {
    valid: [
        {
            name: 'no jest.mock path',
            code: `const foo = getFoo();`,
        },
        {
            name: 'Only one jest.mock path',
            code: `jest.mock('some-path');`,
        },
        {
            name: 'Only one jest.mock path, not at top',
            code: `const foo = getFoo();
                   const bar = getBar();
                   jest.mock('some-path');`,
        },
        {
            name: 'Multiple jest.mock paths',
            code: `jest.mock('some-path');
                   jest.mock('some-other-path');`,
        },
    ],
    invalid: [
        {
            code: `jest.mock('some-path');
                   const foo = getFoo();
                   jest.mock('some-other-path');`,
            errors: [{ message: 'jest.mock should directly follow another jest.mock' }],
            name: 'one statement line in between',
        },
        {
            code: `jest.mock('some-path');
                   jest.mock('some-other-path');
                   const foo = getFoo();
                   jest.mock('some-third-path');`,
            errors: [{ message: 'jest.mock should directly follow another jest.mock' }],
            name: 'two and one jest.mock with one statement line in between',
        },
    ],
});
