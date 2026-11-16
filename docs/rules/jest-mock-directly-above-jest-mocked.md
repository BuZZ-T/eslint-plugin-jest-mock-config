# jest-mock-directly-above-jest-mocked

## Reasons to use this ESLint rule

* Having a better overview of mocks
* Have a more readable test file
* Creating the mock using `jest.mocked` / `vi.mocked` on top level outside of `describe`

## Reasons to not use this ESLint rule

* using a different way to organize the mocks (like `jest-mock-grouped` and `jest-mocked-grouped`)
* don't want to have a strict grouping of mocks

## Correct usages

*all of them work for `vi.mock` / `vi.mocked` as well*

### Placing `jest.mock` the line before `jest.mocked`
**code:**
```
import { something } from 'some-path';

jest.mock('some-path');
const somethingMock = jest.mocked(something);`,
```

## Incorrect usages

*all of them work for `vi.mock` / `vi.mocked` as well*

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

| Configuration | Type | Consequence
|-|-|-
| mockObject | `string[] | string` | By default, this rule checks both [jest](https://www.npmjs.com/package/jest) and [vitest](https://www.npmjs.com/package/vitest) in the project. If you want to restrict the rule to only check one of them, set `mockObject`

### Example

```js
'jest-mock-directly-above-jest-mocked': 'error',
// or
'jest-mock-directly-above-jest-mocked': ['error' {
  mockObject: 'vi'
},
```
