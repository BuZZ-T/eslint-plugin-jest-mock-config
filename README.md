# eslint-plugin-jest-mock-config

ESLint rules for mocking in `jest` using `jest.mock(...)`.
## Rules

This Plugin currently contains the following ESLint rules:

| Name | Description | Documentation
| - | - | -
| `jest-mock-without-import` | Reports `jest.mock(<path>)`, when no import of `<path>` exitsts  | [Link](docs/rules/jest-mock-without-import.md)
| `jest-mocked-without-mock` | Reports `jest.mocked(<function>)`, when the import of `<function>` is not mocked via `jest.mock`  | [Link](docs/rules/jest-mocked-without-mock.md)
| `jest-mock-multiple-with-same-path` | Reports, if `jest.mock(<path>)` is used multiple times with the same path in one file | [Link](docs/rules/jest-mock-multiple-with-same-path.md)

## Installation

```sh
# npm
npm install --safe-dev eslint-plugin-jest-mock-config

#yarn
yarn add --dev eslint-plugin-jest-mock-config
```



#### Additional note
Of cource this works for absolute and relative paths. Decide on your own, if ignoring relative paths is useful!




## Development

### Tests
```
npm test
```

## Usage

### When to use the plugin

If you are using [jest](https://www.npmjs.com/package/jest) with JavaScript or TypeScipt for your tests and want to detect wrong configurations of your jest mocks.

### When to not use the plugin

If you are not using [jest](https://www.npmjs.com/package/jest) in your project


## ESLint7 /  8 / 9 compatibility

Rules included in this ESLint plugin are tested with Version 7 / 8 and 9 of ESLint.
See the [github actions](https://github.com/BuZZ-T/eslint-plugin-jest-mock-config/actions) testing all rules for eslint7, 8 and 9 and the related (stub-) projects localed in [examples](https://github.com/BuZZ-T/eslint-plugin-jest-mock-config/tree/main/examples).

Please report bugs [here](https://github.com/BuZZ-T/eslint-plugin-jest-mock-config/issues), if you still encounter some!
