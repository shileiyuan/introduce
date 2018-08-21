const Controller = require('egg').Controller

class LoginCtrl extends Controller {
  async index() {
    const { username, password } = this.ctx.request.body
    this.ctx.validate({
      username: { type: 'string' },
      password: { type: 'string' },
    })
    const result = await this.ctx.service.login.login(username, password)
    if (result) {
      this.ctx.body = {
        success: true,
        msg: '登陆成功',
        data: result
      }
    } else {
      this.ctx.status = 401
      this.ctx.body = {
        success: false,
        msg: '用户名或密码错误'
      }
    }
  }
  async addUser() {
    const { username, password, age } = this.ctx.request.body
    const id = await this.ctx.service.login.addUser(username, password, age)
    this.ctx.body = id
  }
}

module.exports = LoginCtrl
