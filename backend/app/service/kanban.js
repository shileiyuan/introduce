const Service = require('egg').Service

class KanbanService extends Service {
  async list() {
    const lanes = await this.ctx.model.Lane.findAll()
    const tasks = await this.ctx.model.Task.findAll({ order: ['order'] })
    return {
      lanes,
      tasks
    }
  }

  async moveTask({ taskId, taskIds, laneId }) {
    // const { Task, transaction } = this.ctx.model
    const { Task } = this.ctx.model
    await Task.update({ laneId }, { where: { id: taskId } })
    let rows = 0
    // let results = []
    // const now = Date.now()
    // transaction(async t => {
    //   const promises = taskIds.map((id, index) => Task.update({ order: index }, { where: { id, laneId } }, { transaction: t }))
    //   results = await Promise.all(promises)
    // })

    // const t = await transaction()
    // try {
    //   const promises = taskIds.map((id, index) => Task.update({ order: index }, { where: { id, laneId } }, { transaction: t }))
    //   results = await Promise.all(promises)
    //   t.commit()
    // } catch (error) {
    //   t.rollback()
    // }
    // results.forEach(result => {
    //   affectedRows += result[0]
    // })


    for (let i = 0; i < taskIds.length; i++) {
      const [affectedNum] = await Task.update({ order: i }, { where: { id: taskIds[i], laneId } })
      rows += affectedNum
    }
    // console.log(Date.now() - now, affectedRows)

    return { rows }
  }

  async addTask({ laneId, userId, title }) {
    const { Task } = this.ctx.model
    const maxOrder = await Task.max('order', { where: { laneId } })
    const task = await Task.create({ laneId, userId, title, order: maxOrder + 1 })
    return task
  }

  async deleteTask(id) {
    await this.ctx.model.Task.destroy({ where: { id } })
  }
}

module.exports = KanbanService
