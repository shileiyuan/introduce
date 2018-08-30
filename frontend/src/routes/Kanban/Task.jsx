import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import CONFIG from '../../utils/config'

const source = {
  beginDrag(props) {
    const { task, index } = props
    return { task, index }
  },
  endDrag(props, monitor) {
    document.getElementById(monitor.getItem().task.id).style.display = 'block'
  },
}
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
})

@DragSource(CONFIG.DND_TYPES.TASK, source, collect)
class Task extends Component {
  render() {
    const { task, index, connectDragSource, onClick } = this.props
    const { title, userName, id } = task
    return (
      connectDragSource(
        <div className='task' id={id} task={task}>
          <div className='task-header'>
            <div className='order'>{index + 1}</div>
            <div className='avatar'>{userName}</div>
          </div>
          <div className='task-title' onClick={() => onClick(task)}>{title}</div>

        </div>
      )
    )
  }
}

export default Task
