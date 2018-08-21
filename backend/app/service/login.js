const Service = require('egg').Service
const jwt = require('jsonwebtoken')

class LoginService extends Service {
  async login(username, password) {
    const user = await this.ctx.model.User.findOne({ where: { username, password } })
    if (!user) return false
    const { cert, options } = this.app.config.jwt
    const { id } = user
    const token = jwt.sign({ id }, cert, options)
    return {
      id,
      username,
      token
    }
  }

  async addUser(username, password, age) {
    const { User } = this.ctx.model
    try {
      const user = await User.create({ username, password, age })
      return user.id
    } catch (error) {
      return false
    }
  }
}

module.exports = LoginService
