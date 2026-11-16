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

## Incorrect usages

**code:**
```
const someObjectMock = jest.mocked(someObject);
// some other code
// ...
const someOtherObjectMock = jest.mocked(someOtherObject);
```

## Configuration

| Configuration | Type | Consequence
|-|-|-
| mockObject | `string[] | string` | By default, this rule checks both [jest](https://www.npmjs.com/package/jest) and [vitest](https://www.npmjs.com/package/vitest) in the project. If you want to restrict the rule to only check one of them, set `mockObject`

### Example

```js
'jest-mocked-grouped': 'error',
// or
'jest-mocked-grouped': ['error' {
  mockObject: 'vi'
},

```
