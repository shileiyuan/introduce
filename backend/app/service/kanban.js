const Service = require('egg').Service

class KanbanService extends Service {
  async list() {
    const lanes = await this.ctx.model.Lane.findAll()
    const tasks = await this.ctx.model.Task.findAll()
    return {
      lanes,
      tasks
    }
  }
}

module.exports = KanbanService
