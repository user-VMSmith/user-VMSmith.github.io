// eslint.config.js
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import js from '@eslint/js';
import globals from 'globals';
import jsxRuntime from 'eslint-plugin-react/configs/jsx-runtime';

export default [
    js.configs.recommended,
    jsxRuntime,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        plugins: {
            react: eslintPluginReact,
            'react-hooks': eslintPluginReactHooks,
        },
        rules: {
            'semi': ['error', 'never'],
            'quotes': ['error', 'single'],
            'comma-dangle': ['error', 'only-multiline'],
            'indent': ['error', 4, { SwitchCase: 1 }],
            'no-multi-spaces': 'error',
            'key-spacing': ['error', { beforeColon: false, afterColon: true }],
            'space-before-function-paren': ['error', 'never'],
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
]
