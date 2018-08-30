const Controller = require('egg').Controller

class KanbanCtrl extends Controller {
  async list() {
    const data = await this.ctx.service.kanban.list()
    this.ctx.body = {
      success: true,
      data
    }
  }
  async moveTask() {
    const { taskId, taskIds, laneId } = this.ctx.request.body
    const data = await this.ctx.service.kanban.moveTask({ taskId, taskIds, laneId })
    this.ctx.body = {
      success: true,
      data
    }
  }

  async addTask() {
    const task = this.ctx.request.body
    const newTask = await this.ctx.service.kanban.addTask(task)
    this.ctx.body = {
      success: true,
      data: {
        task: newTask
      }
    }
  }

  async deleteTask() {
    const { id } = this.ctx.request.body
    await this.ctx.service.kanban.deleteTask(id)
    this.ctx.body = {
      success: true
    }
  }
}

module.exports = KanbanCtrl
