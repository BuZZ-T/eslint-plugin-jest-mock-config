'use strict';

const RuleTester = require('eslint').RuleTester;
const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const ruleName = 'detect-jest-mock-without-import';

tester.run(ruleName, require(`../rules/${ruleName}`), {
    valid: [
        // {
        //     code: `import { something } from 'some-absolute-path';
        //            jest.mock('some-absolute-path');`,
        // },
        // {
        //     code: `import { something } from '@scope/some-absolute-path';
        //            jest.mock('@scope/some-absolute-path');`,
        // },
        // {
        //     code: `import { something } from '../some/relative/path';
        //            jest.mock('../some/relative/path');`,
        // },
        // {
        //     code: `import * as something from 'some-absolute-path';
        //            jest.mock('some-absolute-path');`,
        // },
        // {
        //     code: `const something = require('some-absolute-path');
        //            jest.mock('some-absolute-path');`,
        // },
        // {
        //     code: `const something = require('@scope/some-absolute-path');
        //            jest.mock('@scope/some-absolute-path');`,
        // },
        // {
        //     code: `const something = require('../some/relative/path');
        //            jest.mock('../some/relative/path');`,
        // },
        // {
        //     code: `const { something } = require('../some/relative/path');
        //            jest.mock('../some/relative/path');`,
        // },
        {
            code: `jest.mock('some-path-to-ignore');`,
            options: [{ ignore: ['some-path-to-ignore'] }],
        },
        {
            code: `jest.mock('../some/relative/path/to/ignore');`,
            options: [{ ignore: ['../some/relative/path/to/ignore'] }],
        },
    ],
    invalid: [
        // {
        //     code: `jest.mock('some-absolute-path');`,
        //     errors: [{ message: 'jest.mock() path "some-absolute-path" is not imported' }],
        // },
        // {
        //     code: `jest.mock('../some/relative/path');`,
        //     errors: [{ message: 'jest.mock() path "../some/relative/path" is not imported' }],
        // },
        // {
        //     code: `jest.mock('@scope/some-absolute-path');`,
        //     errors: [{ message: 'jest.mock() path "@scope/some-absolute-path" is not imported' }],
        // },
        // {
        //     code: `import { something } from 'some-other-path';
        //            jest.mock('some-absolute-path');`,
        //     errors: [{ message: 'jest.mock() path "some-absolute-path" is not imported' }],
        // },
        // {
        //     code: `const something = require('some-other-path');
        //            jest.mock('../some/relative/path');`,
        //     errors: [{ message: 'jest.mock() path "../some/relative/path" is not imported' }],
        // },
    ]
});
