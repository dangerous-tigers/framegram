import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // Игнорируемые файлы
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**', '*.cjs', '**/*.cjs'],
  },
  // Базовый JS конфиг
  js.configs.recommended,

  // TypeScript конфиг
  ...tseslint.configs.recommended,

  // React конфиг
  pluginReact.configs.flat.recommended,

  {
    files: ['**/*.{js,mjs,ts,mts,cts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect', // автоматически определяет версию React из node_modules
      },
    },
    plugins: { import: pluginImport, prettier: pluginPrettier, 'unused-imports': unusedImports },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'none',
        },
      ],
      // 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      semi: 'error',
      'no-console': 'error',
      'no-debugger': 'error',
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            { pattern: '*.module.scss', group: 'sibling', position: 'after' },
            { pattern: 'components', group: 'internal' },
            { pattern: 'common', group: 'internal' },
            { pattern: 'routes/**', group: 'internal' },
            { pattern: 'assets/**', group: 'internal', position: 'after' },
            { pattern: 'next/font/**', group: 'external', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
        // 'error',
        // {
        //   groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
        //   pathGroups: [
        //     { pattern: '*.module.scss', group: 'sibling', position: 'after' },
        //     { pattern: 'components', group: 'internal' },
        //     { pattern: 'common', group: 'internal' },
        //     { pattern: 'routes/**', group: 'internal' },
        //     { pattern: 'assets/**', group: 'internal', position: 'after' },
        //     { pattern: 'next/font/**', group: 'external', position: 'before' },
        //   ],
        //   pathGroupsExcludedImportTypes: ['internal'],
        //   alphabetize: { order: 'asc', caseInsensitive: true },
        // },
      ],
      // 'import/order': [
      //   'error',
      //   {
      //     groups: [['builtin', 'external'], ['internal', 'sibling', 'parent'], 'index'],
      //     // alphabetize: {
      //     //   order: 'asc',
      //     //   caseInsensitive: true,
      //     // },
      //   },
      // ],
      // 'prettier/prettier': ['error'],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.stories.tsx', '**/*.stories.ts', '**/storybook/**'],
    rules: {
      'react/display-name': 'off',
    },
  },
]);
