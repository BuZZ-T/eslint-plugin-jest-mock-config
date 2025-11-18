module.exports = {
    plugins: ['jest-mock-config'],
    rules: {
        'jest-mock-config/jest-mock-without-import': 'error',
        'jest-mock-config/jest-mocked-without-mock': 'error',
        'jest-mock-config/jest-mock-multiple-with-same-path': 'error',
        'jest-mock-config/jest-mock-grouped': 'error',
        'jest-mock-config/jest-mocked-grouped': 'error',
        'jest-mock-config/jest-mock-directly-above-jest-mocked': 'error',
    },
    parserOptions: {
        ecmaVersion: "latest"
    },
    env: {
        es6: true
    },
    root: true
}
