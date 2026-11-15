/**
 * @author Bastian Gebhardt<buzz-t@buzz-t.eu>
 */

'use strict';

const { getMocks, getMockObjects } = require('../utils/utils');

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'requires all jest.mock statements to be grouped together',
            recommended: false,
            url: 'https://github.com/BuZZ-T/eslint-plugin-jest-mock-config/blob/main/docs/rules/jest-mock-grouped.md',
        },
        messages: {
            mockShouldFollow: '{{objectName}}.mock should directly follow another {{objectName}}.mock',
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
        const mockObjects = getMockObjects(context);

        return {
            Program: function(program) {
                const mocks = getMocks(program, mockObjects);

                const positions = mocks.map((mock) => program.body.indexOf(mock));
                
                const notAfterMock = mocks.map((mock, index) => (index > 0 && positions[index] !== positions[index - 1] + 1) ? mock : undefined);

                notAfterMock.forEach((mock) => {
                    if (mock) {
                        const objectName = mock.expression.callee.object.name;

                        context.report({
                            node: mock,
                            data: {
                                objectName,
                            },
                            messageId: 'mockShouldFollow',
                        });
                    }
                });
            }

        };
    }
};
