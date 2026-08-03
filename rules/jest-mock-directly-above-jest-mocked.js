/**
 * @author Bastian Gebhardt<buzz-t@buzz-t.eu>
 */

'use strict';

const { getPreviousSibling, getImports, isJestMockedCall, getMockObjects } = require("../utils/utils");

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'enforces "tuples" of jest.mock and jest.mocked to be directly above each other',
            recommended: false,
            url: 'https://github.com/BuZZ-T/eslint-plugin-jest-mock-config/blob/main/docs/rules/jest-mock-directly-above-jest-mocked.md',
        },
        messages: {
            noJestMockAbove: 'jest.mock should be directly above jest.mocked',
            cantResolveToImport: 'Can\'t resolve jest.mocked({{mockObject}}) to import',
            wrongJestMockPath: 'jest.mock path does not match jest.mocked path',
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
                if (!isJestMockedCall(node, mockObjects)) {
                    return;
                }

                const previousStatement = getPreviousSibling(node.parent);

                // eslint7 / eslint8 / eslint9 compatibility
                const ancestors = sourceCode?.getAncestors
                    ? sourceCode.getAncestors(node)
                    : context.getAncestors();
                const program = ancestors[0];
                
                const imports = getImports(program);

                if (previousStatement?.type === 'VariableDeclaration'
                    && previousStatement?.declarations.some(declaration => isJestMockedCall(declaration, mockObjects)
                    && !!imports[declaration.init?.arguments[0]?.name]
                    && imports[declaration.init?.arguments[0]?.name] === imports[node.init.arguments[0]?.name])) {
                    return;
                }

                if (previousStatement?.type !== 'ExpressionStatement') {
                    context.report({
                        node,
                        messageId: 'noJestMockAbove',
                    });

                    return;
                }

                const objectName = previousStatement.expression.callee?.object.name;
                const propertyName = previousStatement.expression.callee?.property.name;

                if (!mockObjects.includes(objectName) || propertyName !== 'mock') {
                    context.report({
                        node,
                        messageId: 'noJestMockAbove',
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
                        },
                    });
                    return;
                }
                
                if (previousJestMockPath !== importMockPath) {
                    context.report({
                        node,
                        messageId: 'wrongJestMockPath',
                    });
                }
            },
        };
    }
};
