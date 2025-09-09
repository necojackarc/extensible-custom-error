const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
  },
  {
    files: ['index.mjs'],
    languageOptions: {
      sourceType: 'module',
    },
  },
];
