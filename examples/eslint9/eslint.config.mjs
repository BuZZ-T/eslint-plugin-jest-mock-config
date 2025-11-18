import jestMockConfig from 'eslint-plugin-jest-mock-config';

export default {
    plugins: {
        'jest-mock-config': jestMockConfig
    },
    rules: {
        'jest-mock-config/jest-mock-without-import': [
            'error',
            // { ignorePaths: ['~globals/utils/logger'], ignoreMockWithFactory: true },
          ],
    },
}
