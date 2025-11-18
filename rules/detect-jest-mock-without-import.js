/**
 * 
 * @author Bastian Gebhardt<buzz-t@buzz-t.eu>
 */

'use strict';

//------------------------------------------------------------------------------
// Utils
//------------------------------------------------------------------------------


function extractJestMockCallPath(node) {
    if (node.callee?.object?.name === 'jest' && node.callee?.property?.name === 'mock') {
        return node.arguments?.[0].value;
    } 
    
    return undefined;
}

function getImportPaths(program) {
    const imports = program.body
        .filter((entry) => entry.type === 'ImportDeclaration')
        .map(entry => entry.source.value);

    const requires = program.body
        .filter((entry) => entry.type === 'VariableDeclaration')
        .flatMap((d) => d.declarations)
        .filter((d) => d.init.callee?.name === 'require')
        .map((d) => d.init.arguments[0].value);

    return [...imports, ...requires];
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: 'error',
        docs: {
            description: '',
            category: '',
            recommended: true,
            url: '',
        }
    },
    create: function(context) {
        return {
            CallExpression: function(node) {
                const jestMockCallPath = extractJestMockCallPath(node);

                if (!jestMockCallPath) {
                    return;
                }

                // this only works, when imports are on top level!
                const program = context.getAncestors()[0];

                const importPaths = getImportPaths(program);

                if (!importPaths.includes(jestMockCallPath)) {
                    context.report({
                        node,
                        message: `jest.mock() path "${jestMockCallPath}" is not imported`
                    });
                }
            }
        }
    }
};
