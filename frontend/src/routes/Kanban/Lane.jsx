import React, { Component } from 'react'
import Task from './task'

class Lane extends Component {
  render() {
    const { lane, tasks } = this.props
    return (
      <div>
        <div>{lane.title}</div>
        {
          tasks.map(task => {
            const taskId = task.id
            return <Task key={taskId} data={task} />
          })
        }
      </div>
    )
  }
}

export default Lane
