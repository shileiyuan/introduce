const Service = require('egg').Service
const jwt = require('jsonwebtoken')

class LoginService extends Service {
  async login(name, password) {
    const user = await this.ctx.model.User.findOne({ where: { name, password } })
    if (!user) return false
    const { cert, options } = this.app.config.jwt
    const { id } = user
    const token = jwt.sign({ id }, cert, options)
    return {
      id,
      name,
      token
    }
  }

  async addUser(name, password, age) {
    const { User } = this.ctx.model
    try {
      const user = await User.create({ name, password, age })
      return user.id
    } catch (error) {
      return false
    }
  }
}

module.exports = LoginService
