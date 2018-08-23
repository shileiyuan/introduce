import { observable, action, runInAction, extendObservable } from 'mobx'
import request from '../utils/request'
import API from '../utils/API'

class Kanban {
  @observable lanes = []
  @observable tasksMap = {}

  @action queryList = async () => {
    const response = await request.get(API.query_kanban_list)
    if (response.success) {
      runInAction(() => {
        this.lanes = response.data.lanes
        const tasks = {}
        response.data.lanes.forEach(lane => {
          tasks[lane.id] = []
          response.data.tasks.forEach(task => {
            if (task.laneId === lane.id) {
              tasks[lane.id].push(task)
            }
          })
        })
        this.tasksMap = {}
        extendObservable(this.tasksMap, tasks)
      })
    }
  }
}

export default new Kanban()
