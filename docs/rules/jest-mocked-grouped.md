# jest-mocked-grouped

## Reasons to use this ESLint rule

* Having a better overview of mocks
* Have a more readable test file

## Reasons to not use this ESLint rule

* using a different way to organize the mocks (like `jest-mock-directly-above-jest-mocked`)
* don't want to have a strict grouping of mocks

## Correct usages


**code:**
```
const someObjectMock = jest.mocked(someObject);
const someOtherObjectMock = jest.mocked(someOtherObject);
```

### Incorrect usages

**code:**
```
const someObjectMock = jest.mocked(someObject);
// some other code
// ...
const someOtherObjectMock = jest.mocked(someOtherObject);
```

## Configuration

This ESLint rule is pretty simple. It currently has no configuration.

### Example

```js
'jest-mocked-grouped': 'error',
```
