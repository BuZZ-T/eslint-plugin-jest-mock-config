# eslint-plugin-jest-mock-config

ESLint rules for mocking using
## Rules

This Plugin currently contains the following ESLint rules:

| Name | Description | Documentation
| - | - | -
| `jest-mock-without-import` | Reports `jest.mock(<path>)`, when no import of `<path>` exitsts  | [Link](docs/rules/jest-mock-without-import.md)
| `jest-mocked-without-mock` | Reports `jest.mocked(<function>)`, when the import of `<function>` is not mocked via `jest.mock`  | TODO

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

If you are using [jest](https://www.npmjs.com/package/jest) with JavaScript or TypeScipt for your tests with `.mockReturnValue` / `.mockResolvedValue` / etc and want to detect wrong configurations of your jest mocks.

### When to not use the plugin

* If you are not using [jest](https://www.npmjs.com/package/jest) in your project
* If you are **ONLY** using jest without `.mockReturnValue` / `.mockResolvedValue` / etc. and just mocking the import of the file in `jest.mock` as second parameter, e.g.:
```js
jest.mock('/some/path', () => ({ someFunction: () => { ... } }))
```
