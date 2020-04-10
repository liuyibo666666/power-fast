module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ["off", 2],
    'semi': ['error', 'always'],
    'space-before-function-paren': 'off',
    'no-irregular-whitespace': 'off',
    'no-useless-escape': 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
