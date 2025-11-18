/**
 * Extracts the path, if the given node is a jest.mock call
 */
module.exports.extractJestMockCallPath = function extractJestMockCallPath(node) {
    if (node.callee?.object?.name === 'jest' && node.callee?.property?.name === 'mock') {
        return node.arguments?.[0].value;
    } 
    
    return undefined;
};

/**
 * Extracts all import paths from the given program
 * Regards both import and require statements
 */
module.exports.getImportPaths = function getImportPaths(program) {
    const imports = program.body
        .filter((entry) => entry.type === 'ImportDeclaration')
        .map(entry => entry.source.value);

    const requires = program.body
        .filter((entry) => entry.type === 'VariableDeclaration')
        .flatMap((d) => d.declarations)
        .filter((d) => d.init?.callee?.name === 'require')
        .map((d) => d.init.arguments[0].value);

    return [...imports, ...requires];
};

/**
 * Extract all imports from the given program
 * Returns an key-value pair: imported value => import path
 */
module.exports.getImports = function getImports(program) {
    const imports = program.body
        .filter((entry) => entry.type === 'ImportDeclaration')
        .map(entry => {
            const specifiers = entry.specifiers.map((s) => s.local.name);
            const path = entry.source.value;

            return { path, specifiers };
        })
        .reduce((acc, entry) => {
            entry.specifiers.forEach((specifier) => {
                acc[specifier] = entry.path;
            });

            return acc;
        }, {});

    const requiresAndImports = program.body
        .filter((entry) => entry.type === 'VariableDeclaration')
        .flatMap((d) => d.declarations)
        .filter((d) => d.init?.callee?.name === 'require')
        .map(d => {
            const values = d.id?.properties?.map((p) => p.value.name) || [d.id.name];
            const path = d.init.arguments[0].value;

            return { path, values };
        })
        .reduce((acc, entry) => {
            entry.values.forEach((value) => {
                acc[value] = entry.path;
            });

            return acc;
        }, imports);

    return requiresAndImports;
};

/**
 * Extracts all paths of jest.mock expressions
 */
module.exports.getMockPaths = function(programm) {
    return programm.body.filter(entry => 
        entry.type === 'ExpressionStatement'
        && entry.expression.callee?.object?.name === 'jest'
        && entry.expression.callee?.property?.name === 'mock'
    )
    .map(entry => entry.expression.arguments[0].value);
};

module.exports.getVariables = function(program) {
    const variables = program.body
        .filter((entry) => entry.type === 'VariableDeclaration')
        .flatMap((d) => d.declarations)
        .reduce((acc, d) => {
            if (d.id.type === 'ObjectPattern') {
                d.id.properties.forEach((p) => {
                    acc[p.value.name] = d.init;
                });
            } else {
                acc[d.id.name] = d.init;
            }
            // acc[d.id.name] = d.init;

            return acc;
        }, {});

    return variables;
};

/**
 * Takes the variable name and follows it through the variable declarations to the import path
 */
module.exports.follow = function follow(imports, variables, variable) {
    if (!variable) {
        return undefined;
    }

    if (imports[variable]) {
        return imports[variable];
    }

    const variableValue = variables[variable];
    if (variableValue) {
        if (variableValue.type === 'Identifier') {
            return follow(imports, variables, variableValue.name);
        } else if (variableValue.type === 'MemberExpression') {
            if (variableValue.object.type === 'CallExpression' && variableValue.object.callee.name === 'require') {
                // found require
                const importName = variableValue?.object.arguments[0].value;

                if (importName) {
                    return importName;
                }
            }

            return follow(imports, variables, variableValue.object.name || variableValue.property.name);
        }
    }
};
