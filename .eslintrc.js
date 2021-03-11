module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': 'off',
    'vue/script-indent': ['warn', 2, {
      'baseIndent': 1
    }],
    'no-unused-vars':0,
    'no-undef':0,
    'vue/no-reserved-keys':0
  }
}
