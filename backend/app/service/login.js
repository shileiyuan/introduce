const Service = require('egg').Service

class LoginService extends Service {
  async login(username, password) {
    const user = await this.ctx.model.User.findOne({ where: { name: username, password } })
    return user
  }

  async addUser(username, password, age) {
    const { User } = this.ctx.model
    try {
      const user = await User.create({ name: username, password, age })
      return user.id
    } catch (error) {
      return false
    }
  }
}

module.exports = LoginService
