import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';
import esLintPluginReact from 'eslint-plugin-react';
import esLintPluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**', '**/*.config.js', '**/*.config.mjs'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        JSX: "readonly",
        myCustomGlobal: "readonly",
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      import: importPlugin,
      react: esLintPluginReact,
      'react-hooks': esLintPluginReactHooks,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index'
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],
      ...(tsPlugin.configs?.recommended?.rules ?? {}),
      ...esLintPluginReact.configs?.recommended?.rules,
      ...esLintPluginReactHooks.configs?.recommended?.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  prettier,
];