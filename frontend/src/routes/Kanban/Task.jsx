import React, { Component } from 'react'
import { Icon } from 'antd'

class Task extends Component {
  render() {
    const { task, index, onClick, deleteTask } = this.props
    const { title, userName, id, laneId } = task
    return (
      <div className='task' task={task}>
        <div className='task-header'>
          <div className='order'>{index + 1}</div>
          <div className='delete' onClick={() => deleteTask(id, laneId, index)}><Icon type='close' /></div>
          <div className='avatar'>{userName}</div>
        </div>
        <div className='task-title' onClick={() => onClick(task)}>{title}</div>
      </div>
    )
  }
}

export default Task
