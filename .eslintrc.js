module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'eslint-config-prettier'],
  plugins: ['prettier', 'classPrivateProperties', 'classPrivateMethods'],
  rules: {
    'no-new': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'import/no-named-as-default': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'error',
    'no-alert': 'off',
    'max-depth': ['error', 2],
    'eol-last': ['error', 'always'],
    // "max-lines-per-function": ["error", 17],
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  ignorePatterns: ['cypress', '.eslintrc.js', 'webpack.config.js'],
};
