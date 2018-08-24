const Controller = require('egg').Controller

class KanbanCtrl extends Controller {
  async list() {
    const data = await this.ctx.service.kanban.list()
    this.ctx.body = {
      success: true,
      data
    }
  }
  async changeOrder() {
    const { taskIds, laneId } = this.ctx.request.body
    const data = await this.ctx.service.kanban.changeOrder({ taskIds, laneId })
    this.ctx.body = {
      success: true,
      data
    }
  }
}

module.exports = KanbanCtrl
