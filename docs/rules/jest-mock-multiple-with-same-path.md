# jest-mock-multiple-with-same-path

## Reasons to install this ESLint rule

* The path in `jest.mock(...)` can be used multiple times in the same file
* No error is thrown, neigher by `tsc` nor by running `jest`
* No harm is done, but this is redundant and unnecessary



## Correct usages

#### using jest.mock with the same path only once
**code:**
```
jest.mock('some-package');
```

### Incorrect usages

#### using jest.mock with the same path twice
**code:**
```
jest.mock('some-package');
jest.mock('some-package');
```

## Configuration

This ESLint rule is pretty simple. It currently has no configuration.

### Example

```js
'jest-mock-multiple-with-same-path': 'error',
```
