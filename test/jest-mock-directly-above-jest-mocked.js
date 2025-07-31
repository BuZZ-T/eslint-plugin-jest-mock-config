'use strict';
const { RuleTester } = require("eslint");

const tester = new RuleTester({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
});

const ruleName = 'jest-mock-directly-above-jest-mocked';

tester.run(ruleName, require(`../rules/${ruleName}`), {
    valid: [
        {
            code: `import { something } from 'some-path';
                   jest.mock('some-path');
                   const somethingMock = jest.mocked(something);`,
            name: 'jest.mock directly above jest.mocked (import)',
        },
        {
            code: `const { something } = require('some-path');
                   jest.mock('some-path');
                   const somethingMock = jest.mocked(something);`,
            name: 'jest.mock directly above jest.mocked (require)',
        },
        {
            code: `const { something } = require('some-path');
                   jest.mock('some-path');
                   // some comment
                   const somethingMock = jest.mocked(something);`,
            name: 'jest.mock directly above jest.mocked (comment in between)',
        },
        {
            code: `const { something } = require('some-path');
                   jest.mock('some-path');

                   const somethingMock = jest.mocked(something);`,
            name: 'jest.mock directly above jest.mocked (newline in between)',
        },
        {
            code: `const { something } = require('some-path');
                   const { somethingElse } = require('some-other-path');
                   jest.mock('some-path');
                   const somethingMock = jest.mocked(something);
                   // some comment
                   jest.mock('some-other-path');
                   const somethingElseMock = jest.mocked(somethingElse);
                   `,
            name: 'jest.mock directly above jest.mocked two times',
        },
        {
            code: `const { something } = require('some-path');
                   jest.mock('some-path');`,
            name: 'no jest.mocked',
        },
        {
            code: `import { something } from 'some-path';
                   jest.mock('some-path');
                   const somethingMock = jest.mocked(something);
                   const somethingElseMock = jest.mocked(something);`,
            name: 'multiple jest.mocked calls with same import',
        },
    ],
    invalid: [
        {
            code: `const somethingMock = jest.mocked(something);`,
            name: 'nothing directly above jest.mock',
            errors: ['jest.mock should be directly above jest.mocked' ],
        },
        {
            code: `const somethingElse = fromSomeWhereElse();
                   const somethingMock = jest.mocked(something);`,
            name: 'no jest.moack directly above jest.mock',
            errors: ['jest.mock should be directly above jest.mocked' ],
        },
        {
            code: `import { something } from 'some-path';
                   jest.mock('some-other-path');
                   const somethingMock = jest.mocked(something);`,
            name: 'other jest.mock directly above jest.mocked',
            errors: ['jest.mock path does not match jest.mocked path' ],
        },
        {
            code: `jest.mock('some-other-path');
                   const somethingMock = jest.mocked(something);`,
            name: 'no import of jest.mocked object',
            errors: ['Can\'t resolve jest.mocked(something) to import' ],
        },
        {
            code: `import { something } from 'some-path';
                   const somethingMock = jest.mocked(something);
                   const somethingElseMock = jest.mocked(something);`,
            name: 'multiple jest.mocked calls with same import',
            errors: ['jest.mock should be directly above jest.mocked']
        },
    ]
});
