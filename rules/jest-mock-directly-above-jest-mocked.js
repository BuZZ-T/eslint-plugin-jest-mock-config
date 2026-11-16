/**
 * @author Bastian Gebhardt<buzz-t@buzz-t.eu>
 */

'use strict';

const { getPreviousSibling, getImports, isKnownObjectName, getMockObjects } = require("../utils/utils");

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'enforces "tuples" of jest.mock and jest.mocked to be directly above each other',
            recommended: false,
            url: 'https://github.com/BuZZ-T/eslint-plugin-jest-mock-config/blob/main/docs/rules/jest-mock-directly-above-jest-mocked.md',
        },
        messages: {
            noMockAbove: '{{objectName}}.mock should be directly above {{objectName}}.mocked',
            cantResolveToImport: 'Can\'t resolve {{objectName}}.mocked({{mockObject}}) to import',
            wrongMockPath: '{{objectName}}.mock path does not match {{objectName}}.mocked path',
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
            VariableDeclarator: function(node) {
                if (!isKnownObjectName(node, mockObjects)) {
                    return;
                }

                const previousStatement = getPreviousSibling(node.parent);

                // eslint7-10 compatibility
                const ancestors = sourceCode?.getAncestors
                    ? sourceCode.getAncestors(node)
                    : context.getAncestors();
                const program = ancestors[0];
                
                const imports = getImports(program);

                if (previousStatement?.type === 'VariableDeclaration'
                    && previousStatement?.declarations.some(declaration => isKnownObjectName(declaration, mockObjects)
                    && !!imports[declaration.init?.arguments[0]?.name]
                    && imports[declaration.init?.arguments[0]?.name] === imports[node.init.arguments[0]?.name])) {
                    return;
                }
                const objectName = node.init?.callee?.object?.name;

                if (previousStatement?.type !== 'ExpressionStatement') {
                    context.report({
                        node,
                        data: {
                            objectName,
                        },
                        messageId: 'noMockAbove',
                    });

                    return;
                }
                
                const previousObjectName = previousStatement?.expression.callee?.object.name;
                const previousPropertyName = previousStatement.expression.callee?.property.name;

                if (!mockObjects.includes(previousObjectName) || previousPropertyName !== 'mock') {
                    context.report({
                        node,
                        data: {
                            objectName,
                        },
                        messageId: 'noMockAbove',
                    });

                    return;
                }

                const previousJestMockPath = previousStatement.expression.arguments[0].value;

                const mockedCallSource = node.init.arguments[0].name;

                const importMockPath = imports[mockedCallSource];

                if (!importMockPath) {
                    context.report({
                        node,
                        messageId: 'cantResolveToImport',
                        data: {
                            mockObject: mockedCallSource,
                            objectName: previousObjectName,
                        },
                    });
                    return;
                }
                
                if (previousJestMockPath !== importMockPath) {
                    context.report({
                        node,
                        data: {
                            objectName: previousObjectName,
                        },
                        messageId: 'wrongMockPath',
                    });
                }
            },
        };
    }
};
