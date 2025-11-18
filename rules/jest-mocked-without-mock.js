/**
 * 
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
            jestMockedPathNotImported: `jest.mocked({{mockedCallSource}}), but it's import path is not found. Be sure to directly import it, or use "follow: true"`

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
                if (node.init.type !== 'CallExpression'
                    || node.init.callee?.object?.name !== 'jest'
                    || node.init.callee?.property?.name !== 'mocked') {
                    return;
                }

                // source, which is passed to jest.mocked
                const mockedCallSource = node.init.arguments[0].name;

                // eslint8 / eslint9 compatibility
                const ancestors = sourceCode?.getAncestors
                    ? sourceCode.getAncestors(node)
                    : context.getAncestors();
                
                // this only works, when imports are on top level!
                const program = ancestors[0];

                // key-value: imported value => import path
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
                        messageId: 'jestMockedPathNotImported',
                    });
                    return;
                }

                if (!mockedImportPath && doFollow) {
                    const vars = getVariables(program);
                    mockedImportPath = follow(imports, vars, mockedCallSource);
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
