import React, { Component } from 'react'
import Task from './task'

class Lane extends Component {
  render() {
    const { lane, tasks } = this.props
    return (
      <div className='lane'>
        <h3 className='lane-title'>{lane.title}</h3>
        {
          tasks.map(task => {
            const taskId = task.id
            return <Task key={taskId} task={task} />
          })
        }
      </div>
    )
  }
}

export default Lane
