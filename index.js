/**
 * eslint-plugin-jest-mock-config - ESLint plugin for jest.mock() paths
 */

'use strict';

module.exports = {
    rules: {
        'jest-mock-without-import': require('./rules/jest-mock-without-import'),
        'jest-mocked-without-mock': require('./rules/jest-mocked-without-mock'),
        'jest-mock-multiple-with-same-path': require('./rules/jest-mock-multiple-with-same-path'),
        'jest-mock-directly-above-jest-mocked': require('./rules/jest-mock-directly-above-jest-mocked'),
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
