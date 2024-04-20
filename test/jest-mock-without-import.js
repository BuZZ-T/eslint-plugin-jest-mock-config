'use strict';

const RuleTester = require('eslint').RuleTester;
const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const ruleName = 'jest-mock-without-import';

tester.run(ruleName, require(`../rules/${ruleName}`), {
    valid: [
        {
            code: `import { something } from 'some-absolute-path';
                   jest.mock('some-absolute-path');`,
            name: 'import object absolute path',
        },
        {
            code: `import { something } from '@scope/some-absolute-path';
                   jest.mock('@scope/some-absolute-path');`,
            name: 'import object absolute path with scope',
        },
        {
            code: `import { something } from '../some/relative/path';
                   jest.mock('../some/relative/path');`,
            name: 'import object relative path',
        },
        {
            code: `import something from 'some-absolute-path';
                   jest.mock('some-absolute-path');`,
            name: 'import default absolute path',
        },
        {
            code: `import * as something from 'some-absolute-path';
                   jest.mock('some-absolute-path');`,
            name: 'import namespace absolute path',
        },
        {
            code: `const something = require('some-absolute-path');
                   jest.mock('some-absolute-path');`,
            name: 'require absolute path',
        },
        {
            code: `const something = require('@scope/some-absolute-path');
                   jest.mock('@scope/some-absolute-path');`,
            name: 'require absolute path with scope',
        },
        {
            code: `const something = require('../some/relative/path');
                   jest.mock('../some/relative/path');`,
            name: 'require relative path',
        },
        {
            code: `const { something } = require('../some/relative/path');
                   jest.mock('../some/relative/path');`,
            name: 'require object destructuring',
        },
        {
            code: `const something = require('some-absolute-path');
                   const { someFunction } = something;
                   jest.mock('some-absolute-path');`,
            name: 'require object destructuring',
        },
        {
            code: `const other = require('some-other-absolute-path'), something = require('some-absolute-path');
                   const { someFunction } = something;
                   jest.mock('some-absolute-path');`,
            name: 'multiple requires',
        },
        {
            code: `const someObject = require('some-absolute-path');
                   const someFnLocal = someObject.someFn;
  
                   jest.mock('some-absolute-path');
  
                   const someFnMocked = jest.mocked(someFnLocal);`,
            name: 'require object with alias',
        },
        {
            code: `jest.mock('some-path-to-ignore');`,
            options: [{ ignorePaths: ['some-path-to-ignore'] }],
            name: 'ignore absolute path',
        },
        {
            code: `jest.mock('../some/relative/path/to/ignore');`,
            options: [{ ignorePaths: ['../some/relative/path/to/ignore'] }],
            name: 'ignore relative path',
        },
        {
            code: `jest.mock('prefix-of-a-longer-path');`,
            options: [{ ignorePatterns: [/^prefix-/] }],
            name: 'ignore pattern',
        },
        {
            code: `jest.mock('../some/relative/path/with/pattern/to/ignore');`,
            options: [{ ignorePatterns: [/with\/pattern/] }],
            name: 'ignore pattern 2',
        },
        {
            code: `jest.mock('some-path-to-ignore', () => { someFn: jest.fn() });`,
            options: [{ ignoreMockWithFactory: true }],
            name: 'ignore absolute path with factory',
        },
        {
            code: `jest.mock('../some/relative/path/to/ignore', () => { someFn: jest.fn() });`,
            options: [{ ignoreMockWithFactory: true }],
            name: 'ignore relative path with factory',
        },
        {
            code: `jest.mock('some-path-to-ignore', factory);`,
            options: [{ ignoreMockWithFactory: true }],
            name: 'ignore absolute path with factory object',
        },
        {
            code: `jest.mock('../some/relative/path/to/ignore', factory);`,
            options: [{ ignoreMockWithFactory: true }],
            name: 'ignore relative path with factory object',
        },
        {
            code: `jest.mock('some-path-to-ignore', () => { someFn: jest.fn()}, { virtual: true });`,
            options: [{ ignoreVirtual: true }],
            name: 'ignore absolute path with virtual',
        },
    ],
    invalid: [
        {
            code: `jest.mock('some-absolute-path');`,
            errors: [{ message: 'jest.mock() path "some-absolute-path" is not imported' }],
            name: 'missing absolute path',
        },
        {
            code: `jest.mock('../some/relative/path');`,
            errors: [{ message: 'jest.mock() path "../some/relative/path" is not imported' }],
            name: 'missing relative path',
        },
        {
            code: `jest.mock('@scope/some-absolute-path');`,
            errors: [{ message: 'jest.mock() path "@scope/some-absolute-path" is not imported' }],
            name: 'missing absolute path with scope',
        },
        {
            code: `import { something } from 'some-other-path';
                   jest.mock('some-absolute-path');`,
            errors: [{ message: 'jest.mock() path "some-absolute-path" is not imported' }],
            name: 'missing absolute path with wrong import path',
        },
        {
            code: `const something = require('some-other-path');
                   jest.mock('../some/relative/path');`,
            errors: [{ message: 'jest.mock() path "../some/relative/path" is not imported' }],
            name: 'missing relative path with wrong require path',
        },
        {
            code: `jest.mock('some-absolute-path', factory);`,
            errors: [{ message: 'jest.mock() path "some-absolute-path" is not imported' }],
            name: 'missing absolute path with factory without ignoreMockWithFactory',
        },
        {
            code: `jest.mock('../some/relative/path', factory);`,
            errors: [{ message: 'jest.mock() path "../some/relative/path" is not imported' }],
            name: 'missing relative path with factory object without ignoreMockWithFactory',
        },
        {
            code: `jest.mock('some-absolute-path', () => { someFn: jest.fn()}, { virtual: true });`,
            errors: [ { message: 'jest.mock() path "some-absolute-path" is not imported'}],
            name: 'missing absolute path with virtual',
        },
        {
            code: `jest.mock('some-absolute-path', () => { someFn: jest.fn()}, { virtual: false });`,
            options: [{ ignoreVirtual: true }],
            errors: [ { message: 'jest.mock() path "some-absolute-path" is not imported'}],
            name: 'missing absolute path with virtual: false and ignoreVirtual',
        },
    ]
});
