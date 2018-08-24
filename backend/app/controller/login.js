const Controller = require('egg').Controller

class LoginCtrl extends Controller {
  async index() {
    const { name, password } = this.ctx.request.body
    this.ctx.validate({
      name: { type: 'string' },
      password: { type: 'string' },
    })
    const result = await this.ctx.service.login.login(name, password)
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
    const { name, password, age } = this.ctx.request.body
    const id = await this.ctx.service.login.addUser(name, password, age)
    this.ctx.body = id
  }
}

module.exports = LoginCtrl
