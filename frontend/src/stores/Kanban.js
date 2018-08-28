import { observable, action, runInAction, extendObservable } from 'mobx'
import request from '../utils/request'
import API from '../utils/API'

class Kanban {
  @observable lanes = []
  @observable tasksMap = {}

  @action queryList = async () => {
    const [kanbanResult, userResult] = await Promise.all([request.get(API.query_kanban_list), request.get(API.query_userList)])
    if (kanbanResult.success && userResult.success) {
      const userMap = {}
      userResult.data.forEach(user => {
        userMap[user.id] = user
      })
      const tasks = {}
      kanbanResult.data.lanes.forEach(lane => {
        tasks[lane.id] = []
        kanbanResult.data.tasks.forEach(task => {
          if (task.laneId === lane.id) {
            task.userName = userMap[task.userId].name
            tasks[lane.id].push(task)
          }
        })
      })
      runInAction(() => {
        this.lanes = kanbanResult.data.lanes
        this.tasksMap = {}
        extendObservable(this.tasksMap, tasks)
      })
    }
  }

  @action getLane = laneId => this.tasksMap[laneId] || []

  @action moveTask = (task, fromLaneId, fromIndex, toLaneId, toIndex) => {
    console.log(fromIndex, toIndex)
    const fromLane = this.getLane(fromLaneId)
    const toLane = this.getLane(toLaneId)
    fromLane.splice(fromIndex, 1)
    toLane.splice(toIndex, 0, {
      ...task,
      laneId: toLaneId
    })
    const taskIds = toLane.map(task => task.id)
    request.post(API.kanban_moveTask, {
      taskIds,
      taskId: task.id,
      laneId: toLaneId
    })
  }
}

export default new Kanban()
