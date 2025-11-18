/**
 * @author Bastian Gebhardt<buzz-t@buzz-t.eu>
 */

'use strict';

const { follow, getImports, getMockPaths, getVariables } = require('../utils/utils');

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow jest.mocked() calls, which are not mocked with jest.mock()',
            category: '',
            recommended: true,
            url: '',
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

        return {
            VariableDeclarator: function(node) {
                if (node.init?.type !== 'CallExpression'
                    || node.init.callee?.object?.name !== 'jest'
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

                // array of paths, for which jest.mock is called
                const mockPaths = getMockPaths(program);

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
