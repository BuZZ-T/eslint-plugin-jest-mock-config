# eslint-plugin-jest-mock-config

[![NPM Version](https://img.shields.io/npm/v/eslint-plugin-jest-mock-config.svg)](https://www.npmjs.com/package/eslint-plugin-jest-mock-config) [![Package License](https://img.shields.io/npm/l/eslint-plugin-jest-mock-config.svg)](https://www.npmjs.com/package/eslint-plugin-jest-mock-config) [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/BuZZ-T/eslint-plugin-jest-mock-config/test.yml?branch=main)](https://img.shields.io/github/actions/workflow/status/BuZZ-T/eslint-plugin-jest-mock-config/test.yml?branch=main)


ESLint rules for mocking in `jest` using `jest.mock(...)`.
## Rules

This Plugin currently contains the following ESLint rules:

| Name | Description | Documentation
| - | - | -
| **Rules showing errors**
| `jest-mock-without-import` | Reports `jest.mock(<path>)`, when no import of `<path>` exists  | [Link](docs/rules/jest-mock-without-import.md)
| `jest-mocked-without-mock` | Reports `jest.mocked(<function>)`, when the import of `<function>` is not mocked via `jest.mock`  | [Link](docs/rules/jest-mocked-without-mock.md)
| `jest-mock-multiple-with-same-path` | Reports, if `jest.mock(<path>)` is used multiple times with the same path in one file | [Link](docs/rules/jest-mock-multiple-with-same-path.md)
| **Layouting rules**
| `jest-mock-directly-above-jest-mocked` | Reports, if a `jest.mock()` call and its corresponding `jest.mocked` call don't come directly after each other. Conflicts with `jest-mock-grouped` and `jest-mocked-grouped` | [Link](docs/rules/jest-mock-directly-above-jest-mocked.md)
| `jest-mock-grouped` | Reports, if not all `jest.mock()` calls come directly after each other. Conflicts with `jest-mock-directly-above-jest-mocked` | [Link](docs/rules/jest-mock-grouped.md)
| `jest-mocked-grouped` | Reports, if not all `jest.mocked()` calls come directly after each other. Conflicts with `jest-mock-directly-above-jest-mocked` | [Link](docs/rules/jest-mocked-grouped.md)

## Installation

```sh
# npm
npm install --safe-dev eslint-plugin-jest-mock-config

#yarn
yarn add --dev eslint-plugin-jest-mock-config
```

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
