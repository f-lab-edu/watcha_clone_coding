import watchaConfig from '@watcha/eslint-config';

export default [
  ...watchaConfig,
  {
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    settings: {
      react: {
        version: '19.1.1',
      },
    },
  },
];