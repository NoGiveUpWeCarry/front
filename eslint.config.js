import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import airbnbBase from 'eslint-config-airbnb-base';
import airbnbReact from 'eslint-config-airbnb/rules/react';
import airbnbHooks from 'eslint-config-airbnb/rules/react-hooks';
import airbnbTS from 'eslint-config-airbnb-typescript/lib/shared.js';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: ['node_modules', 'dist'], // ESLint가 무시할 디렉토리
  },
  {
    files: ['src/**/*.{ts,tsx}'], // TypeScript 및 React 파일에 적용
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.app.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // React JSX 지원
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
    },
    rules: {
      ...airbnbBase.rules,
      ...airbnbReact.rules,
      ...airbnbHooks.rules,
      ...airbnbTS.rules,
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [
        1,
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
    },
    settings: {
      react: {
        version: 'detect', // 설치된 React 버전에 따라 자동 감지
      },
    },
  },
  prettierRecommended,
];
