/**
 * eslint-plugin-jest-mock-path - ESLint plugin for jest.mock() paths
 */

'use strict';

const RuleTester = require('eslint').RuleTester;
const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

module.exports = {
    rules: {
        'detect-jest-mock-without-import': require('./rules/detect-jest-mock-without-import'),
    },
    rulesConfig: {
        'detect-jest-mock-without-import': 0,
    },
    configs: {
        recommended: {
            rules: {
                'jest-mock-path/detect-jest-mock-without-import': 'error',
            },
        },
    }
};
