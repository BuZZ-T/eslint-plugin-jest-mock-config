'use strict';

const RuleTester = require('eslint').RuleTester;
const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const ruleName = 'jest-mocked-without-mock';

tester.run(ruleName, require(`../rules/${ruleName}`), {
    valid: [
        {
          code: `import { someFnLocal } from 'some-absolute-path';

                 jest.mock('some-absolute-path');

                 const someFnMocked = jest.mocked(someFnLocal);`,
          name: 'import object absolute path',
        },
        {
          code: `import { someFnLocal } from '../some/path/to/file';

                 jest.mock('../some/path/to/file');

                 const someFnMocked = jest.mocked(someFnLocal);`,
          name: 'import object relative path',
        },
        {
          code: `import { someFnImported as someFnLocal } from 'some-absolute-path';

                 jest.mock('some-absolute-path');

                 const someFnMocked = jest.mocked(someFnLocal);`,
          name: 'import object with alias',
        },
        {
          code: `import someFnLocal from 'some-absolute-path';

                 jest.mock('some-absolute-path');

                 const someFnMocked = jest.mocked(someFnLocal);`,
          name: 'import default absolute path',
        },
        {
          code: `import someFnLocal from '../some/path/to/file';

                 jest.mock('../some/path/to/file');

                 const someFnMocked = jest.mocked(someFnLocal);`,
          name: 'import default relative path',
        },
        {
          code: `import * as someFnLocal from 'some-absolute-path';

                 jest.mock('some-absolute-path');

                 const someFnMocked = jest.mocked(someFnLocal);`,
          name: 'import namespace absolute path',
        },
        {
          code: `const { someFn } = require('some-absolute-path');

                 jest.mock('some-absolute-path');

                 const someFnMocked = jest.mocked(someFn);`,
          name: 'require object absolute path',
        },
        {
          code: `const { someFnImported: someFnLocal } = require('some-absolute-path');

                 jest.mock('some-absolute-path');

                 const someFnMocked = jest.mocked(someFnLocal);`,
          name: 'require object with alias',
        },
        {
          code: `const { someFn2 } = require('some-absolute-path-2'), { someFn } = require('some-absolute-path');

                 jest.mock('some-absolute-path');

                 const someFnMocked = jest.mocked(someFn);`,
          name: 'multiple requires',
        },
        {
          code: `const someFn = require('some-absolute-path');

                 jest.mock('some-absolute-path');

                 const someFnMocked = jest.mocked(someFn);`,
          name: 'require default absolute path',
        },
        {
          code: `import { someObject } from 'some-absolute-path';
                 const someFn = someObject.someFn;

                 jest.mock('some-absolute-path');

                 const someFnMocked = jest.mocked(someFn);`,
          options: [{ follow: true }],
          name: 'import object with follow',
        },
        {
          code: `import { someObject } from 'some-absolute-path';
                 const { someFn } = someObject;

                 jest.mock('some-absolute-path');

                 const someFnMocked = jest.mocked(someFn);`,
          options: [{ follow: true }],
          name: 'import object with follow and destructuring',
        },
        {
          code: `const someFnLocal = require('some-absolute-path').someFn;
                 
                 jest.mock('some-absolute-path');

                 const someFnMocked = jest.mocked(someFnLocal);`,
          options: [{ follow: true }],
          name: 'require with renaming',
        }
      ],
      invalid: [
        {
          code: `import { someOtherFn } from 'some-other-absolute-path';
          
          jest.mock('some-absolute-path');
          
          const someFnNotMocked = jest.mocked(someOtherFn);`,
          errors: ['jest.mocked(someOtherFn), but it\'s import path "some-other-absolute-path" is not mocked with jest.mock()'],
          name: 'missing import path',
        },
        {
          code: `const { someOtherFn } = require('some-other-absolute-path');
          
          jest.mock('some-absolute-path');
          
          const someFnNotMocked = jest.mocked(someOtherFn);`,
          errors: ['jest.mocked(someOtherFn), but it\'s import path "some-other-absolute-path" is not mocked with jest.mock()'],
          name: 'missing require path',
        },
        {
          code: `const someFn = require('some-absolute-path');
                 const someFnLocal = someObject.someFn;
  
                 jest.mock('some-absolute-path');
  
                 const someFnMocked = jest.mocked(someFnLocal);`,
          errors: ["jest.mocked(someFnLocal), but it's import path is not found. Be sure to directly import it, or use \"follow: true\""],
          name: 'no direct import without follow',
        },
    ]
});
