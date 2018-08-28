import { observable, action, runInAction, extendObservable } from 'mobx'
import request from '../utils/request'
import API from '../utils/API'
import CONFIG from '../utils/config'

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

  @action dropTask = (sourceTask, targetTask) => {
    console.log('drop', sourceTask.id, targetTask.id)
    const sourceLane = this.getLane(sourceTask.laneId)
    const targetLane = this.getLane(targetTask.laneId)
    const sourceTaskIndex = sourceLane.findIndex(task => task.id === sourceTask.id)
    const holderIndex = targetLane.findIndex(task => task.id === CONFIG.PLACE_HOLDER_ID)
    console.log('holderIndex', holderIndex)
    sourceLane.splice(sourceTaskIndex, 1)
    targetLane[holderIndex] = {
      ...sourceTask,
      laneId: targetTask.laneId
    }
  }

  @action overTargetTask = (sourceTask, targetTask) => {
    const targetLane = this.getLane(targetTask.laneId)
    const targetTaskIndex = targetLane.findIndex(task => task.id === targetTask.id)
    const oldPlaceHolderIndex = targetLane.findIndex(task => task.id === CONFIG.PLACE_HOLDER_ID)
    // 移动到不同的lane
    if (sourceTask.laneId !== targetTask.laneId) {
      if (oldPlaceHolderIndex > -1) {
        // 如果当前的lane中已经有holder了，就将当前状态为isOver的task与holder交换位置
        const temp = targetLane[oldPlaceHolderIndex]
        targetLane[oldPlaceHolderIndex] = targetLane[targetTaskIndex]
        targetLane[targetTaskIndex] = temp
      } else {
        // 否则当前lane中如果还没有holder就添加一个
        targetLane.splice(targetTaskIndex, 0, { id: CONFIG.PLACE_HOLDER_ID, title: 'abc', laneId: targetTask.laneId })
      }
    } else {
      // 在同一个lane中移动
      if (sourceTask.id !== targetTask.id) {
        const sourceTaskIndex = targetLane.findIndex(task => task.id === sourceTask.id)
        const temp = targetLane[sourceTaskIndex]
        targetLane[sourceTaskIndex] = targetLane[targetTaskIndex]
        targetLane[targetTaskIndex] = temp
      }
    }
  }
}

export default new Kanban()
