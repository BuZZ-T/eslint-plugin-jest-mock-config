# jest-mock-multiple-with-same-path

## Reasons to install this ESLint rule

* The path in `jest.mock(...)` can be used multiple times in the same file
* No error is thrown, neigher by `tsc` nor by running `jest`
* No harm is done, but this is redundant and unnecessary

## Correct usages

*all of them work for `vi.mock` / `vi.mocked` as well*

### using jest.mock with the same path only once
**code:**
```
jest.mock('some-package');
```

## Incorrect usages

*all of them work for `vi.mock` / `vi.mocked` as well*

### using jest.mock with the same path twice
**code:**
```
jest.mock('some-package');
jest.mock('some-package');
```

## Configuration

| Configuration | Type | Consequence
|-|-|-
| mockObject | `string[] | string` | By default, this rule checks both [jest](https://www.npmjs.com/package/jest) and [vitest](https://www.npmjs.com/package/vitest) in the project. If you want to restrict the rule to only check one of them, set `mockObject`

### Example

```js
'jest-mock-multiple-with-same-path': 'error',
// or
'jest-mock-multiple-with-same-path': ['error' {
  mockObject: 'vi'
},
```
