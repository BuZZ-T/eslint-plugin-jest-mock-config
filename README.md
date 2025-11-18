# eslint-plugin-jest-mock-path

ESLint rules for paths in jest.mock()

This project includes a rule that identifies `jest.mock(<path>)` without an import in the file for the same `<path>`.

## Technical background

To use `jest.mock` correctly, you should do the following:

**first** mock a file by its path:
```
jest.mock('path/to/file')
```
**then**

* If you are using TypeScript:
```ts
import { someFunction } from 'path/to/file');

const someFunctionMock = jest.mocked(someFunction);
someFunctionMock.mockReturnvalue(...)
```

* If you are using only JavaScript:
```js
const someFunction = require('path/to/file');

someFunction.mockReturnValue(...)
```

If the second step is omitted, it indicates that you

* either not configuring the mock
* or using `jest.mock(...)` with a wrong path

This ESLint rules is targeting the second case!

## Reasons to install this ESLint rule

* The path in `jest.mock(...)` has no autocompletion (like import/require has)
* The path is not covered by refactoring rules of IDEs when moving or renaming files
* The path is not covered by the jest ESLint rules
* The path is not covered by other famous ESLint rules like import/no-unresolved
* The path is not covered by `tsc` when using TypeScript

=> only running the tests could reveal the error

## Installation

```sh
# npm
npm install --safe-dev eslint-plugin-jest-mock-path

#yarn
yarn add --dev eslint-plugin-jest-mock-path
```

## Development

### Tests
```
npm test
```

## Usage

### When to use the plugin

If you are using [jest](https://www.npmjs.com/package/jest) with JavaScript or TypeScipt for your tests

## When to not use the plugin

If you are not using [jest](https://www.npmjs.com/package/jest) in your project