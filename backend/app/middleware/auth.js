const jwt = require('jsonwebtoken')

module.exports = () => {
  return async function auth(ctx, next) {
    const { header, cert } = ctx.app.config.jwt
    try {
      const decode = jwt.verify(ctx.get(header), cert)
      ctx.userId = decode.id
    } catch (err) {
      ctx.status = 403
      ctx.body = {
        success: false,
        msg: '授权失败，请重新登录'
      }
      return
    }
    await next()
  }
}
