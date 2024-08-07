import jestMockConfig from 'eslint-plugin-jest-mock-config';

export default [
    {
        plugins: {
            'jest-mock-config': jestMockConfig,
        },
    },
    jestMockConfig.configs.recommended,
]
