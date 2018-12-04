import React, { Component } from 'react'
import Task from './Task'

let styles = {
  transform: 'rotate(7deg)'
}

class TaskDragPreview extends Component {
  render() {
    const { task, index, width, height } = this.props
    const style = {
      ...styles,
      width,
      height,
      cursor: 'move',
      border: '1px solid red'
    }
    return (
      <div style={style}>
        <Task task={task} index={index} />
      </div>
    )
  }
}

export default TaskDragPreview
