module.exports = {
  extends: 'eslint-config-egg',
  parser: 'babel-eslint',
  rules: {
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'strict': 0,
    'semi': [2,  'never'],
    'array-bracket-spacing': 0
  }
};
