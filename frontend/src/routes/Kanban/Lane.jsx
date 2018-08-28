import React, { Component } from 'react'
import LaneBody from './LaneBody'

// import { DropTarget } from 'react-dnd'
// import CONFIG from '../../utils/config'

// const laneTarget = {
//   drop(props, monitor) {
//     const task = monitor.getItem()
//     const taskId = task.id
//     const fromLaneId = task.laneId
//     const toLaneId = props.lane.id
//     props.moveTask(taskId, fromLaneId, toLaneId)
//   },
//   canDrop(props, monitor) {
//     const currentLaneId = props.laneMeta.id
//     const taskOflaneId = monitor.getItem().laneId
//     return currentLaneId !== taskOflaneId
//   }
// }
// const collect = (connect, monitor) => ({
//   connectDropTarget: connect.dropTarget(),
//   isOver: monitor.isOver(),
//   canDrop: monitor.canDrop()
// })

// @DropTarget(CONFIG.DND_TYPES.TASK, laneTarget, collect)

class Lane extends Component {
  render() {
    const { lane, tasks, ...rest } = this.props
    return (
      <div className='lane'>
        <h3 className='lane-title'>{lane.title}</h3>
        <LaneBody tasks={tasks} {...rest} />
      </div>
    )
  }
}

export default Lane
