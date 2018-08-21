const Controller = require('egg').Controller

class LoginCtrl extends Controller {
  async index() {
    const { username, password } = this.ctx.request.body
    this.ctx.validate({
      username: { type: 'string' },
      password: { type: 'string' },
    })
    const user = await this.ctx.service.login.login(username, password)
    if (user) {
      this.ctx.body = user
    } else {
      this.ctx.body = 'login failed'
    }
  }
  async addUser() {
    const { username, password, age } = this.ctx.request.body
    const id = await this.ctx.service.login.addUser(username, password, age)
    this.ctx.body = id
  }
}

module.exports = LoginCtrl
