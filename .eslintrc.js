// module.exports = {
//   root: true,
//   env: {
//     node: true,
//   },
//   extends: [
//     'plugin:vue/vue3-essential',
//     '@vue/airbnb',
//     '@vue/typescript/recommended',
//   ],
//   parserOptions: {
//     ecmaVersion: 2020,
//   },
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//   },
// };
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'eslint-config-standard',
    'plugin:vue/essential',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'error',
    'indent': [2, 2, {'SwitchCase': 1}],
    'vue/no-unused-components': ['error', {
      'ignoreWhenBindingPresent': true
    }]
  },
  ignorePatterns: ['not.*.*'],
  globals: {
    'PROD': true
  }
};
