'use strict';

const { RuleTester } = require('eslint');
const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const ruleName = 'jest-mock-multiple-with-same-path';

tester.run(ruleName, require(`../rules/${ruleName}`), {
    valid: [
        {
            name: 'No jest.mock used',
            code: `import { something } from 'some-absolute-path';`,
        },
        {
            name: 'jest.mock path with absolute path used once',
            code: `import { something } from 'some-absolute-path';
                   jest.mock('some-absolute-path');`,
        },
        {
            name: 'jest.mock path with absolute path used twice with different paths',
            code: `import { something } from 'some-absolute-path';
                   import { somethingElse } from 'some-other-absolute-path';
                   jest.mock('some-absolute-path');
                   jest.mock('some-other-absolute-path');`,
        },
        {
            name: 'jest.mock path with relative path used once',
            code: `import { something } from '../path/to/file';
                   jest.mock('../path/to/file');`,
        },
        {
            name: 'jest.mock path with relative path used twice with different paths',
            code: `import { something } from '../path/to/file';
                   import { somethingElse } from '../path/to/other/file';
                   jest.mock('../path/to/file');
                   jest.mock('../path/to/other/file');`,
        },
    ],
    invalid: [
        {
            name: 'jest.mock path with absolute path used twice',
            code: `import { something } from 'some-absolute-path';
                     jest.mock('some-absolute-path');
                     jest.mock('some-absolute-path');`,
            errors: ['jest.mock(\'some-absolute-path\') is used more than once', 'jest.mock(\'some-absolute-path\') is used more than once'],
        },
        {
            name: 'jest.mock path with absolute path used three times',
            code: `import { something } from 'some-absolute-path';
                     jest.mock('some-absolute-path');
                     jest.mock('some-absolute-path');
                     jest.mock('some-absolute-path');`,
            errors: [
                'jest.mock(\'some-absolute-path\') is used more than once',
                'jest.mock(\'some-absolute-path\') is used more than once',
                'jest.mock(\'some-absolute-path\') is used more than once',
            ],
        },
        {
            name: 'jest.mock path with relative path used twice',
            code: `import { something } from 'some-absolute-path';
                     jest.mock('../path/to/file');
                     jest.mock('../path/to/file');`,
            errors: ['jest.mock(\'../path/to/file\') is used more than once', 'jest.mock(\'../path/to/file\') is used more than once'],
        },
        {
            name: 'jest.mock path with relative path used three times',
            code: `import { something } from 'some-absolute-path';
                     jest.mock('../path/to/file');
                     jest.mock('../path/to/file');
                     jest.mock('../path/to/file');`,
            errors: [
                'jest.mock(\'../path/to/file\') is used more than once',
                'jest.mock(\'../path/to/file\') is used more than once',
                'jest.mock(\'../path/to/file\') is used more than once',
            ],
        },
        {
            name: 'jest.mock path twice, one of them with factory',
            code: `import { something } from 'some-absolute-path';
                   jest.mock('some-absolute-path');
                   jest.mock('some-absolute-path', () => ({ someFn: jest.fn() }));`,
            errors: [
                'jest.mock(\'some-absolute-path\') is used more than once',
                'jest.mock(\'some-absolute-path\') is used more than once',
            ],
        },
    ],
});
