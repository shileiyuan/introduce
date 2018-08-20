const Controller = require('egg').Controller

class HelloCtrl extends Controller {
  index() {
    this.ctx.type = 'html'
    this.ctx.body = '<h3>Hello</h3>'
  }
}

module.exports = HelloCtrl
