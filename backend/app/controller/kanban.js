const Controller = require('egg').Controller

class KanbanCtrl extends Controller {
  async list() {
    const data = await this.ctx.service.kanban.list()
    this.ctx.body = {
      success: true,
      data
    }
  }
}

module.exports = KanbanCtrl
