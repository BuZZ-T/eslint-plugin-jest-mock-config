/**
 * eslint-plugin-jest-mock-config - ESLint plugin for jest.mock() paths
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
        'jest-mock-without-import': require('./rules/jest-mock-without-import'),
    },
    rulesConfig: {
        'jest-mock-without-import': 0,
    },
    configs: {
        recommended: {
            rules: {
                'jest-mock-path/jest-mock-without-import': 'error',
            },
        },
    }
};
