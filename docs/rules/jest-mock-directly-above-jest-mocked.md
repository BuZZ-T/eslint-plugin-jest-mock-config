# jest-mock-directly-above-jest-mocked

## Reasons to use this ESLint rule

* Having a better overview of mocks
* Have a more readable test file
* Creating the mock using `jest.mocked` on top level outside of `describe`

## Reasons to not use this ESLint rule

* using a different way to organize the mocks (like `jest-mock-grouped` and `jest.mocked.grouped`)
* don't want to have a strict grouping of mocks

## Correct usages

### Placing `jest.mock` the line before `jest.mocked`
**code:**
```
import { something } from 'some-path';

jest.mock('some-path');
const somethingMock = jest.mocked(something);`,
```

## Incorrect usages

### only having `jest.mocked`
**code:**
```
const somethingMock = jest.mocked(something);
```

### having something else instead of `jest.mock` above
```
const somethingElse = fromSomeWhereElse();
const somethingMock = jest.mocked(something);`,
```

### having some other `jest.mock` above
```
import { something } from 'some-path';

jest.mock('some-other-path');
const somethingMock = jest.mocked(something);
```

## Configuration

This ESLint rule is pretty simple. It currently has no configuration.

### Example

```js
'jest-mock-directly-above-jest-mocked': 'error',
```
