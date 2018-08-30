const Controller = require('egg').Controller

class UserCtrl extends Controller {
  async list() {
    const data = await this.ctx.service.user.list()
    this.ctx.body = {
      success: true,
      data,
      total: data.length
    }
  }

  async getUserInfoByToken() {
    const data = await this.ctx.service.user.getUserById(this.ctx.userId)
    this.ctx.body = {
      success: true,
      data: {
        name: data.name,
        id: this.ctx.userId
      }
    }
  }

}

module.exports = UserCtrl
