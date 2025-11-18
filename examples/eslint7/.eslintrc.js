module.exports = {
    plugins: ['jest-mock-config'],
    rules: {
        'jest-mock-config/jest-mock-without-import': [
            'error',
            // { ignorePaths: ['~globals/utils/logger'], ignoreMockWithFactory: true },
          ],
    },
    parserOptions: {
        ecmaVersion: "latest"
    },

    env: {
        es6: true
    },
    root: true
}
