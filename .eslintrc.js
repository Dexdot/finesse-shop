module.exports = {
  root: true,
  env: {
    browser: true
  },
  globals: {
    $: true
  },
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'import/no-cycle': false
  },
  settings: {
    'import/resolver': {
      alias: [['@', './src/js/']]
    }
  }
};
