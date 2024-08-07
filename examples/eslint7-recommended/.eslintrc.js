module.exports = {
    plugins: ['jest-mock-config'],
    extends: ['plugin:jest-mock-config/recommended'],
    parserOptions: {
        ecmaVersion: "latest"
    },

    env: {
        es6: true
    },
    root: true
}
