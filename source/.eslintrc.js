module.exports = {
    root: true,
    env: {
      browser: true,
      'jest/globals': true,
    },
    extends: [
      'airbnb-typescript',
      'prettier',
      'prettier/@typescript-eslint',
      'plugin:react/recommended',
    ],
    rules: {
      'import/no-unresolved': ['off'],
      '@typescript-eslint/no-use-before-define': ['off'],
      'class-methods-use-this': ['off'],
      'import/prefer-default-export': ['off'],
      'react/destructuring-assignment': ['off'],
      'react/state-in-constructor': ['off'],
      'react/jsx-props-no-spreading': ['off'],
      'react/display-name': ['off'],
      'no-underscore-dangle': ['warn'],
      '@typescript-eslint/no-useless-constructor': ['off'],
      '@typescript-eslint/no-unused-expressions': ['off'],
    },
    parser: '@typescript-eslint/parser',
    ignorePatterns: [
      'node_modules/',
      'build/',
      '.eslintrc.js',
    ],
    plugins: ['@typescript-eslint'],
    settings: {
      react: {
        version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: '.',
    },
  };
  