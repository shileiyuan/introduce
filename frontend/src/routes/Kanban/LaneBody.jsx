import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { DropTarget } from 'react-dnd'
import CONFIG from '../../utils/config'
import Task from './Task'

const laneTarget = {
  drop(props, monitor) {
    // const task = monitor.getItem()
    // const taskId = task.id
    // const fromLaneId = task.laneId
    // const toLaneId = props.lane.id
    // props.moveTask(taskId, fromLaneId, toLaneId)
  },
  // canDrop(props, monitor) {
  //   const currentLaneId = props.laneMeta.id
  //   const taskOflaneId = monitor.getItem().laneId
  //   return currentLaneId !== taskOflaneId
  // }
}
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true })
  // canDrop: monitor.canDrop()
})

@DropTarget(CONFIG.DND_TYPES.TASK, laneTarget, collect)
@observer
class LaneBody extends Component {
  render() {
    const { tasks, connectDropTarget, isOver, ...rest } = this.props
    console.log('LaneBody', isOver)
    return (
      connectDropTarget(
        <div className='lane-body'>
          {
            tasks.map(task => {
              const taskId = task.id
              return <Task key={taskId} task={task} {...rest} />
            })
          }
        </div>
      )
    )
  }
}

export default LaneBody
