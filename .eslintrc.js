module.exports = {
  extends: 'eslint:recommended',
  env: {
    browser: true,
    es6: true,
    mocha: true,
    node: true,
  },
  rules: {
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': ['error', { 'allowAfterThis': true }],
    'no-var': 'error',
    'prefer-const': 'error',
    'quote-props': ['error', 'consistent-as-needed'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  }
};
