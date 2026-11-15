/**
 * @author Bastian Gebhardt<buzz-t@buzz-t.eu>
 */

'use strict';

const { getMockPaths, extractMockCallPath, getMockObjects } = require('../utils/utils');

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallows jest.mock() calls with the same path more than once',
            recommended: true,
            url: 'https://github.com/BuZZ-T/eslint-plugin-jest-mock-config/blob/main/docs/rules/jest-mock-multiple-with-same-path.md',
        },
        messages: {
            mockUsedMoreThanOnce: '{{objectName}}.mock(\'{{path}}\') is used more than once',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    mockObject: {
                        default: ['jest', 'vi'],
                        oneOf: [
                            { type: 'string' },
                            {
                                type: 'array',
                                items: { type: 'string' },
                            },
                        ],
                    },
                },
                additionalProperties: false,
            },
        ],
    },
    create: function(context) {
        const { sourceCode } = context;

        const mockObjects = getMockObjects(context);

        return {
            CallExpression: function(node) {
                const jestMockCallPath = extractMockCallPath(node, mockObjects);

                if (!jestMockCallPath) {
                    return;
                }

                const objectName = node.callee?.object?.name;

                // eslint7-10 compatibility
                const ancestors = sourceCode?.getAncestors
                    ? sourceCode.getAncestors(node)
                    : context.getAncestors();
                const program = ancestors[0];

                const mockPaths = getMockPaths(program, mockObjects);

                const pathAmount = mockPaths.filter((path) => path === jestMockCallPath).length;

                if (pathAmount > 1) {
                    context.report({
                        node,
                        data: {
                            path: jestMockCallPath,
                            objectName,
                        },
                        messageId: 'mockUsedMoreThanOnce',
                    });
                }
                
            }
        };
    }
};
