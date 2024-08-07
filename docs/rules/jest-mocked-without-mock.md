# jest-mocked-without-mock

## Reasons to install this ESLint rule

* When using TypeScript with jest, you need to use `jest.mocked(...)` to correctly type your mock and let TypeScript know that the jest mock functions like `.mockReturnValue()` etc. are available
* `jest.mocked` is an identity function, which just changes the type `T` to `MaybeMocked<T>` or `MaybeMockedDeep<T>`.
* The mocking itself, including adding the mock functions like `.mockReturnValue` is not done in `jest.mocked(...)`, you still need `jest.mock(<import-path>)` for this
* A missing `jest.mock` can't be determined statically, you need to run the test and observing an undescribing error like 
> `TypeError: <function>.mockResolvedValue is not a function`

## Correct usages

#### using import with object
```ts
import { someFn } from 'some-absolute-path';

jest.mock('some-absolute-path');

const someFnMock = jest.mocked(someFn)'
```

```ts
import { someFn } from '../some/path/to/file';

jest.mock('../some/path/to/file');

const someFnMock = jest.mocked(someFn)'
```

#### using default import
```ts
import someFn from 'some-absolute-path';

jest.mock('some-absolute-path');

const someFnMock = jest.mocked(someFn)';
```

```ts
import someFn from '../some/path/to/file';

jest.mock('../some/path/to/file');

const someFnMock = jest.mocked(someFn)';
```

#### using import with asterisk
```ts
import * as someFn from 'some-absolute-path';

jest.mock('some-absolute-path');

const someFnMock = jest.mocked(someFn)';
```

```ts
import * as someFn from '../some/path/to/file';

jest.mock('../some/path/to/file');

const someFnMock = jest.mocked(someFn)';
```

#### using require with object
```ts
const { someFn } = require('some-absolute-path');

jest.mock('some-absolute-path');

const someFnMock = jest.mocked(someFn)';
```

```ts
const { someFn } = require('../some/path/to/file');

jest.mock('../some/path/to/file');

const someFnMock = jest.mocked(someFn)';
```

#### using require with default
```ts
const someFn = require('some-absolute-path');

jest.mock('some-absolute-path');

const someFnMock = jest.mocked(someFn)';
```

```ts
const someFn = require('../some/path/to/file');

jest.mock('../some/path/to/file');

const someFnMock = jest.mocked(someFn)';
```

#### accessing object with `{ follow: true }`

**code:**
```ts
const { someObject } = require('some-absolute-path');

const someFn = someObject.someFn;

jest.mock('some-absolute-path');

const someFnMock = jest.mocked(someFn)';
```

**configuration:**
```
['error', { follow: true }]
```

#### using destructoring of import with `{ follow: true }`

**code:**
```ts
const { someObject } = require('some-absolute-path');

const { someFn } = someObject;

jest.mock('some-absolute-path');

const someFnMock = jest.mocked(someFn)';
```

**configuration:**
```
['error', { follow: true }]
```

### Incorrect usages

#### missing mock
```
import { someFn } from 'some-absolute-path';

const someFnMock = jest.mocked(someFn);
```

#### no direct import without `{ follow: true }`
```ts
const { someObject } = require('some-absolute-path');

const { someFn } = someObject;

jest.mock('some-absolute-path');

const someFnMock = jest.mocked(someFn)';
```

## Configuration

### follow: true

At the moment, only one configuration flag is available. If it's not set, only direct imported functions are regarded. If you mock functions from imported objects, for some reason, use this config:
```
{ follow: true }
```

Be aware:

* this might affect the performance of the linting process if you have many and large test files.
* this is an **experimental** option, probably not all relevant cases are covered. Report bugs!