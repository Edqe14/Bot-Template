module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2019
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'airbnb-base/legacy'
  ],
  rules: {
    semi: 'off',
    quotes: 'off',
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': 'error',
    'class-methods-use-this': 'off',
    'linebreak-style': ['error', 'unix'],
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
};
