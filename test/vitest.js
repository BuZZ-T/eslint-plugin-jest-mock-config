'use strict';

const { RuleTester } = require('eslint');
const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
});

const mockObjectVi = [{ mockObject: ['vi'] }];

tester.run('jest-mock-without-import (vitest)', require('../rules/jest-mock-without-import'), {
    valid: [
        {
            code: `import { something } from 'some-absolute-path';
                   vi.mock('some-absolute-path');`,
            options: mockObjectVi,
            name: 'vi.mock with matching import',
        },
        {
            code: `vi.mock('some-absolute-path', () => ({ someFn: vi.fn() }));`,
            options: mockObjectVi.map((o) => ({ ...o, ignoreMockWithFactory: true })),
            name: 'vi.mock with factory ignored',
        },
        {
            code: `import { something } from 'some-absolute-path';
                   jest.mock('some-absolute-path');`,
            name: 'default (jest) still only matches jest',
        },
        {
            code: `vi.mock('some-absolute-path');`,
            options: [{ mockObject: ['jest'] }],
            name: 'vi.mock ignored when only jest configured',
        },
    ],
    invalid: [
        {
            code: `vi.mock('some-absolute-path');`,
            options: mockObjectVi,
            errors: [{ message: 'jest.mock() path "some-absolute-path" is not imported' }],
            name: 'vi.mock with missing import',
        },
    ],
});

tester.run('jest-mock-multiple-with-same-path (vitest)', require('../rules/jest-mock-multiple-with-same-path'), {
    valid: [
        {
            code: `import { something } from 'some-absolute-path';
                   vi.mock('some-absolute-path');`,
            options: mockObjectVi,
            name: 'single vi.mock',
        },
    ],
    invalid: [
        {
            code: `vi.mock('some-absolute-path');
                   vi.mock('some-absolute-path');`,
            options: mockObjectVi,
            errors: [
                { message: 'jest.mock(\'some-absolute-path\') is used more than once' },
                { message: 'jest.mock(\'some-absolute-path\') is used more than once' },
            ],
            name: 'duplicate vi.mock',
        },
    ],
});

tester.run('jest-mocked-without-mock (vitest)', require('../rules/jest-mocked-without-mock'), {
    valid: [
        {
            code: `import { something } from 'some-absolute-path';
                   vi.mock('some-absolute-path');
                   const mock = vi.mocked(something);`,
            options: mockObjectVi,
            name: 'vi.mocked with matching vi.mock',
        },
    ],
    invalid: [
        {
            code: `import { something } from 'some-absolute-path';
                   const mock = vi.mocked(something);`,
            options: mockObjectVi,
            errors: [{ message: 'jest.mocked(something), but it\'s import path "some-absolute-path" is not mocked with jest.mock()' }],
            name: 'vi.mocked without vi.mock',
        },
    ],
});

tester.run('jest-mock-grouped (vitest)', require('../rules/jest-mock-grouped'), {
    valid: [
        {
            code: `vi.mock('a');
                   vi.mock('b');`,
            options: mockObjectVi,
            name: 'grouped vi.mock',
        },
    ],
    invalid: [
        {
            code: `vi.mock('a');
                   const x = 1;
                   vi.mock('b');`,
            options: mockObjectVi,
            errors: [{ message: 'jest.mock should directly follow another jest.mock' }],
            name: 'ungrouped vi.mock',
        },
    ],
});

tester.run('jest-mocked-grouped (vitest)', require('../rules/jest-mocked-grouped'), {
    valid: [
        {
            code: `import { a, b } from 'p';
                   const ma = vi.mocked(a);
                   const mb = vi.mocked(b);`,
            options: mockObjectVi,
            name: 'grouped vi.mocked',
        },
    ],
    invalid: [
        {
            code: `import { a, b } from 'p';
                   const ma = vi.mocked(a);
                   const x = 1;
                   const mb = vi.mocked(b);`,
            options: mockObjectVi,
            errors: [{ message: 'jest.mocked should directly follow another jest.mocked' }],
            name: 'ungrouped vi.mocked',
        },
    ],
});

tester.run('jest-mock-directly-above-jest-mocked (vitest)', require('../rules/jest-mock-directly-above-jest-mocked'), {
    valid: [
        {
            code: `import { something } from 'some-absolute-path';
                   vi.mock('some-absolute-path');
                   const mock = vi.mocked(something);`,
            options: mockObjectVi,
            name: 'vi.mock directly above vi.mocked',
        },
    ],
    invalid: [
        {
            code: `import { something } from 'some-absolute-path';
                   vi.mock('some-absolute-path');
                   const x = something;
                   const mock = vi.mocked(something);`,
            options: mockObjectVi,
            errors: [{ message: 'jest.mock should be directly above jest.mocked' }],
            name: 'vi.mock not directly above vi.mocked',
        },
    ],
});

tester.run('both jest and vi (vitest)', require('../rules/jest-mock-without-import'), {
    valid: [
        {
            code: `import { a } from 'a';
                   import { b } from 'b';
                   jest.mock('a');
                   vi.mock('b');`,
            options: [{ mockObject: ['jest', 'vi'] }],
            name: 'jest and vi combined',
        },
    ],
    invalid: [
        {
            code: `vi.mock('a');`,
            options: [{ mockObject: ['jest', 'vi'] }],
            errors: [{ message: 'jest.mock() path "a" is not imported' }],
            name: 'vi flagged when combined',
        },
    ],
});
