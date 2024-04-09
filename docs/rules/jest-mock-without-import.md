# jest-mock-without-import

## Reasons to install this ESLint rule

* The path in `jest.mock(...)` has no autocompletion (like import/require has)
* The path is not covered by refactoring rules of IDEs when moving or renaming files
* The path is not covered by the jest ESLint rules
* The path is not covered by other famous ESLint rules like import/no-unresolved
* The path is not covered by `tsc` when using TypeScript

=> only running the tests could reveal the error

## Correct usages

#### using import
**code:**
```
import someFunction from 'some-package';

jest.mock('some-package');
```

**code:**
```
import someFunction from '../some/path/to/file';

jest.mock('../some/path/to/file');
```

#### using import with destructoring
**code:**
```
import { someFunction } from 'some-package';

jest.mock('some-package');
```

**code:**
```
import { someFunction } from '../some/path/to/file';

jest.mock('../some/path/to/file');
```

#### using import with "*" syntax
**code:**
```
import * as someFunction from 'some-package'

jest.mock('some-package')
```

**code:**
```
import * as someFunction from '../some/path/to/file'

jest.mock('../some/path/to/file')
```
#### using `require`
**code:**
```
const someFunction = require('some-package');

jest.mock('some-package')
```

**code:**
```
const someFunction = require('../some/path/to/file');

jest.mock('../some/path/to/file')
```
#### using `require` with destructoring
**code:**
```
const { someFunction } = require('some-package');

jest.mock('some-package')
```

**code:**
```
const { someFunction } = require('../some/path/to/file');

jest.mock('../some/path/to/file')
```

#### with configuration ignorePaths
**code:**
```
jest.mock('some-package');
```
**configuration:**
```
['error', { ignorePaths: ['some-package'] }]
```

#### with configuration ignorePatterns using a string
**code:**
```
jest.mock('some-package');
```
**configuration:**
```
['error', { ignorePatterns: ['some-.*'] };
```

#### with configuration ignorePatterns using a regex
**code:**
```
jest.mock('some-package');
```
**configuration:**
```
['error', { ignorePatterns: [/some-.*/ };
```

#### with configuration ignoreMockWithFactory
**code:**
```
jest.mock('some-package', () => { someFunction: jest.mock() });
```
**configuration:**
```
['error', { ignoreMockWithFactory: true }]
```

### Invalid usages

#### absolute path without import
**code:**
```
jest.mock('some-package');
```

#### relative path without import
**code:**
```
jest.mock('../path/to/someFile');
```

#### absolute path with factory without import
**code:**
```
jest.mock('some-package', () => { someFunction: jest.fn() });
```

## Configuration

There are multiple ways to exclude `jest.mock` calls:

| Configuration | Type | Consequence | Reasons to use
| - | - | - | -
| ignorePaths | string[] | Paths added to this array are ignored. So no linting error is thrown, even if this path is not imported into the test file but used in `jest.mock`
| ignorePatterns | string[] / Regex Array | Basically the same as `ignorePaths`, but Regular Expressions (as string or Regex) can be used.
| ignoreMockWithFactory | boolean | The second parameter of the `jest.mock()` function is a so called factory. It allows to directly specify the mock without using `.mockReturnValue`. If `ignoreMockWithFactory` is set to `true`, `jest.mock()` calls with a factory set, are not checked.

### Example

```js
'jest-mock-path/detect-jest-mock-without-import': ['error', {
  ignorePaths: ['some-path'],
  ignorePatterns: ['pattern-as-string', /pattern-as-regex/],
  ignoreMockWithFactory: true
}],
```
