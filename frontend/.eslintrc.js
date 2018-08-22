module.exports = {
  parser: 'babel-eslint',
  extends: ['standard', 'standard-react'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  globals: {
    $: 'jquery',
    _: 'lodash',
    R: 'ramda',
    cls: 'classnames'
  },
  // plugins: [
  //   'compat'
  // ],
  rules: {
    'space-before-function-paren': 0,
    'react/prop-types': 0,
    'space-before-function-paren': 'off',
    'semi': [2,  'never'],
    'quotes': [2, 'single']
  },
};
