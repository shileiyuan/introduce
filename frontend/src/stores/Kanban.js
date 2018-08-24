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
}

export default new Kanban()
