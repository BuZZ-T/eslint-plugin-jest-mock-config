/**
 * 
 * @author Bastian Gebhardt<buzz-t@buzz-t.eu>
 */

'use strict';

const { extractJestMockCallPath, getImportPaths } = require('../utils/utils');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow jest.mock() calls, which are not imported',
            category: '',
            recommended: true,
            url: '',
        },
        messages: {
            jestMockPathNotImported: 'jest.mock() path "{{path}}" is not imported',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    ignorePaths: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                    ignoreMockWithFactory: {
                        type: 'boolean',
                    },
                    ignoreVirtual: {
                        type: 'boolean',
                    },
                    ignorePatterns: {
                        type: 'array',
                        items: {
                            type: ['string', 'object'],
                        },
                    },
                },
                additionalProperties: false,
            },
        ],
    },
    create: function(context) {
        const { sourceCode } = context;

        const pathsToIgnore = context.options[0]?.ignorePaths || [];
        const patternsToIgnore = (context.options[0]?.ignorePatterns || []).map(pattern => typeof pattern === 'string' ? new RegExp(pattern) : pattern);
        const isIgnoreMockWithFactory = !!context.options[0]?.ignoreMockWithFactory;
        const isIgnoreVirtual = !!context.options[0]?.ignoreVirtual;

        return {
            CallExpression: function(node) {
                const jestMockCallPath = extractJestMockCallPath(node);

                if (!jestMockCallPath) {
                    return;
                }

                if (isIgnoreMockWithFactory && node.arguments.length > 1) {
                    return;
                }

                if (isIgnoreVirtual
                        && node.arguments.length > 2
                        && node.arguments[2].type === 'ObjectExpression'
                        && node.arguments[2].properties.some(p => p.key.name === 'virtual' && p.value.value === true)) {
                    return;
                }

                // eslint8 / eslint9 compatibility
                const ancestors = sourceCode.getAncestors
                    ? sourceCode.getAncestors(node)
                    : context.getAncestors();
                
                // this only works, when imports are on top level!
                const program = ancestors[0];

                const importPaths = getImportPaths(program);

                if (!importPaths.includes(jestMockCallPath) && !pathsToIgnore.includes(jestMockCallPath) && !patternsToIgnore.some(pattern => pattern.test(jestMockCallPath))) {
                    context.report({
                        node,
                        data: {
                            path: jestMockCallPath,
                        },
                        messageId: 'jestMockPathNotImported',
                    });
                }
            }
        };
    }
};
