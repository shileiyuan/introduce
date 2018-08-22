const Service = require('egg').Service

class UserService extends Service {
  async list() {
    const users = await this.ctx.model.User.findAll()
    return users || []
  }
  async getUserById(id) {
    return await this.ctx.model.User.findOne({ where: { id } })
  }
}

module.exports = UserService
