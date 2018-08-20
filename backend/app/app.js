module.exports = app => {
  // 添加自定义校验规则
  app.validator.addRule('json', (rule, value) => {
    try {
      JSON.parse(value)
    } catch (err) {
      return 'must be json string'
    }
  })
}
