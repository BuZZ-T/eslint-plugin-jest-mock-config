/**
 * @author Bastian Gebhardt<buzz-t@buzz-t.eu>
 */

'use strict';

module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'requires all jest.mock statements to be grouped together',
            recommended: false,
            url: 'https://github.com/BuZZ-T/eslint-plugin-jest-mock-config/blob/main/docs/rules/jest-mocked-grouped.md',
        },
        messages: {
            jestMockedShouldFollow: 'jest.mocked should directly follow another jest.mocked',
        },
        schema: [],
    },
    create: function(context) {

        return {
            Program: function(program) {
                const mockedStatements = program.body.filter((node) => node.type === 'VariableDeclaration'
                    && node.declarations[0].init?.type === 'CallExpression'
                    && node.declarations[0].init.callee?.object?.name === 'jest'
                    && node.declarations[0].init.callee?.property?.name === 'mocked');

                const positions = mockedStatements.map((mock) => program.body.indexOf(mock));

                const notAfterMock = mockedStatements.map((mocked, index) => (index > 0 && positions[index] !== positions[index - 1] + 1) ? mocked : undefined);

                notAfterMock.forEach((mock) => {
                    if (mock) {
                        context.report({
                            node: mock,
                            messageId: 'jestMockedShouldFollow',
                        });
                    }
                });
            }
        };
    }
};
