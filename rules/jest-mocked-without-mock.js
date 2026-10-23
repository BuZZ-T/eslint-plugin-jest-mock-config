/**
 * @author Bastian Gebhardt<buzz-t@buzz-t.eu>
 */

'use strict';

const { follow, getImports, getMockPaths, getVariables, getMockObjects } = require('../utils/utils');

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow jest.mocked() calls, which are not mocked with jest.mock()',
            recommended: true,
            url: 'https://github.com/BuZZ-T/eslint-plugin-jest-mock-config/blob/main/docs/rules/jest-mocked-without-mock.md',
        },
        messages: {
            jestMockPathNotImported: `jest.mocked({{mockedCallSource}}), but it's import path "{{mockedImportPath}}" is not mocked with jest.mock()`,
            jestMockedPathNotImportedUseFollow: `jest.mocked({{mockedCallSource}}), but it's import path is not found. Be sure to directly import it, or use "follow: true"`,
            jestMockedPathNotImported: `jest.mocked({{mockedCallSource}}), but it's import path is not found. Be sure to directly import it`
        },
        schema: [
            {
                type: 'object',
                properties: {
                    mockObject: {
                        oneOf: [
                            { type: 'string' },
                            {
                                type: 'array',
                                items: { type: 'string' },
                            },
                        ],
                    },
                    follow: {
                        type: 'boolean',
                    },
                },
                additionalProperties: false,
            }
        ]
    },
    create: function(context) {
        const { sourceCode } = context;
        const doFollow = !!context.options[0]?.follow;
        const mockObjects = getMockObjects(context);

        return {
            VariableDeclarator: function(node) {
                if (node.init?.type !== 'CallExpression'
                    || !mockObjects.includes(node.init.callee?.object?.name)
                    || node.init.callee?.property?.name !== 'mocked') {
                    return;
                }

                // source, which is passed to jest.mocked
                const mockedCallSource = node.init.arguments[0].name;

                // eslint7 / eslint8 / eslint9 compatibility
                const ancestors = sourceCode?.getAncestors
                    ? sourceCode.getAncestors(node)
                    : context.getAncestors();
                const program = ancestors[0];

                const imports = getImports(program);

                // import path of the source, which is passed to jest.mocked
                // jest.mock should be called with it
                let mockedImportPath = imports[mockedCallSource];

                if (!mockedImportPath && !doFollow) {
                    context.report({
                        node,
                        data: {
                            mockedCallSource,
                        },
                        messageId: 'jestMockedPathNotImportedUseFollow',
                    });
                    return;
                }

                if (!mockedImportPath && doFollow) {
                    const vars = getVariables(program);
                    mockedImportPath = follow(imports, vars, mockedCallSource);
                }

                if(!mockedImportPath) {
                    context.report({
                        node,
                        data: {
                            mockedCallSource,
                        },
                        messageId: 'jestMockedPathNotImported',
                    });
                    return;
                }

                // array of paths, for which jest.mock / vi.mock is called
                const mockPaths = getMockPaths(program, mockObjects);

                const isImported = mockPaths.includes(mockedImportPath);
                if (!isImported) {
                    context.report({
                        node,
                        data: {
                            mockedCallSource,
                            mockedImportPath,
                        },
                        messageId: 'jestMockPathNotImported',
                    });
                }
            }
        };
    }
};
