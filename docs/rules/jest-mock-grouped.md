# jest-mock-grouped

## Reasons to use this ESLint rule

* Having a better overview of mocks
* Have a more readable test file

## Reasons to not use this ESLint rule

* using a different way to organize the mocks (like `jest-mock-directly-above-jest-mocked`)
* don't want to have a strict grouping of mocks

## Correct usages

*all of them work for `vi.mock` / `vi.mocked` as well*

**code:**
```
jest.mock('../some/path/to/file');
jest.mock('../some/path/to/other/file');
```

## Incorrect usages

*all of them work for `vi.mock` / `vi.mocked` as well*

**code:**
```
jest.mock('../some/path/to/file');
// some other code
// ...
jest.mock('../some/path/to/other/file');
```

## Configuration

| Configuration | Type | Consequence
|-|-|-
| mockObject | `string[] | string` | By default, this rule checks both [jest](https://www.npmjs.com/package/jest) and [vitest](https://www.npmjs.com/package/vitest) in the project. If you want to restrict the rule to only check one of them, set `mockObject`

### Example

```js
'jest-mock-grouped': 'error',
// or
'jest-mock-grouped': ['error' {
  mockObject: 'vi'
},

```
