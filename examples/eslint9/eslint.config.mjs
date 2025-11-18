import jestMockConfig from 'eslint-plugin-jest-mock-config';

export default {
    plugins: {
        'jest-mock-config': jestMockConfig
    },
    rules: {
        'jest-mock-config/jest-mock-without-import': 'error',
        'jest-mock-config/jest-mocked-without-mock': 'error',
        'jest-mock-config/jest-mock-multiple-with-same-path': 'error',
    },
}
