module.exports = {
    "extends": ["plugin:eslint-plugin/recommended"],
    "rules": {
      "eslint-plugin/require-meta-docs-description": "error",
      "no-console": "error",
      "no-unused-vars": "error",
      "semi": ["error", "always"],
    },
    "parserOptions": {
        "ecmaVersion": "latest"
    },

    "env": {
        "es6": true
    }
};
