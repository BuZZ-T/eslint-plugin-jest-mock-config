/**
 * @author Bastian Gebhardt<buzz-t@buzz-t.eu>
 */

'use strict';

const { getPreviousSibling, getImports } = require("../utils/utils");

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'enforces "tuples" of jest.mock and jest.mocked to be directly above each other',
            category: '',
            recommended: false,
            url: '',
        },
        messages: {
            noJestMockAbove: 'jest.mock should be directly above jest.mocked',
            cantResolveToImport: 'Can\'t resolve jest.mocked({{mockObject}}) to import',
            wrongJestMockPath: 'jest.mock path does not match jest.mocked path',
        },
        schema: [],
    },
    create: function(context) {
        const { sourceCode } = context;

        return {
            VariableDeclarator: function(node) {
                if (node.init?.type !== 'CallExpression'
                    || node.init.callee?.object?.name !== 'jest'
                    || node.init.callee?.property?.name !== 'mocked') {
                    return;
                }

                debugger;

                const previousStatement = getPreviousSibling(node.parent);

                if (previousStatement?.type !== 'ExpressionStatement') {
                    context.report({
                        node,
                        messageId: 'noJestMockAbove',
                    });

                    return;
                }

                const objectName = previousStatement.expression.callee.object.name;
                const propertyName = previousStatement.expression.callee.property.name;

                if (objectName !== 'jest' || propertyName !== 'mock') {
                    context.report({
                        node,
                        messageId: 'noJestMockAbove',
                    });

                    return;
                }

                const previousJestMockPath = previousStatement.expression.arguments[0].value;

                const mockedCallSource = node.init.arguments[0].name;

                // eslint7 / eslint8 / eslint9 compatibility
                const ancestors = sourceCode?.getAncestors
                    ? sourceCode.getAncestors(node)
                    : context.getAncestors();
                const program = ancestors[0];
                
                const imports = getImports(program);

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
