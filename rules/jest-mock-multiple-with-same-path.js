/**
 * @author Bastian Gebhardt<buzz-t@buzz-t.eu>
 */

'use strict';

const { getMockPaths, extractJestMockCallPath } = require('../utils/utils');

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallows jest.mock() calls with the same path more than once',
            category: '',
            recommended: true,
            url: '',
        },
        messages: {
            jestMockUsedMoreThanOnce: 'jest.mock(\'{{path}}\') is used more than once',
        },
        schema: [],
    },
    create: function(context) {
        const { sourceCode } = context;

        return {
            CallExpression: function(node) {
                const jestMockCallPath = extractJestMockCallPath(node);

                if (!jestMockCallPath) {
                    return;
                }

                // eslint7 / eslint8 / eslint9 compatibility
                const ancestors = sourceCode?.getAncestors
                    ? sourceCode.getAncestors(node)
                    : context.getAncestors();
                const program = ancestors[0];

                const mockPaths = getMockPaths(program);

                const pathAmount = mockPaths.filter((path) => path === jestMockCallPath).length;

                if (pathAmount > 1) {
                    context.report({
                        node,
                        messageId: 'jestMockUsedMoreThanOnce',
                        data: {
                            path: jestMockCallPath,
                        },
                    });
                }
                
            }
        };
    }
};
