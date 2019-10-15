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
    // 分号警告
    'semi': 'off',
    // 引号警告
    'quotes': 'off',
    // 函数前是否加空格警告
    'space-before-function-paren': ['warn', 'never'],
    // 代码含有未使用的变量警告
    'no-unused-vars': [0, {
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
    'no-tabs': ['off'],
    'indent': ['off'],
    'no-useless-return': ['off', 'never'],
    // 代码含有已导入但未使用的组件
    'no-unused-components': ['off'],
    // 行尾存在空格警告
    'no-trailing-spaces': ['off']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
