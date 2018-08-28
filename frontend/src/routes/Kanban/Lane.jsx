import React, { Component } from 'react'
import LaneBody from './LaneBody'

class Lane extends Component {
  render() {
    const { lane, tasks, moveTask } = this.props
    return (
      <div className='lane'>
        <h3 className='lane-title'>{lane.title}</h3>
        <LaneBody tasks={tasks} laneId={lane.id} moveTask={moveTask} />
      </div>
    )
  }
}

export default Lane
