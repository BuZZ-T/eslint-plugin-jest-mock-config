# jest-mock-grouped

## Reasons to use this ESLint rule

* Having a better overview of mocks
* Have a more readable test file

## Reasons to not use this ESLint rule

* using a different way to organize the mocks (like `jest-mock-directly-above-jest-mocked`)
* don't want to have a strict grouping of mocks

## Correct usages


**code:**
```
jest.mock('../some/path/to/file');
jest.mock('../some/path/to/other/file');
```

### Incorrect usages

**code:**
```
jest.mock('../some/path/to/file');
// some other code
// ...
jest.mock('../some/path/to/other/file');
```

## Configuration

This ESLint rule is pretty simple. It currently has no configuration.

### Example

```js
'jest-mock-grouped': 'error',
```
