import React from 'react'
import { observer, inject } from 'mobx-react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './index.less'
import Lane from './Lane'
import Toolbar from './Toolbar'

@DragDropContext(HTML5Backend)
@inject('kanbanStore')
@observer
export default class Kanban extends React.Component {
  componentDidMount() {
    this.props.kanbanStore.queryList()
  }
  render() {
    const { lanes, tasksMap, moveTask, addTask } = this.props.kanbanStore
    return (
      <div className='kanban'>
        <Toolbar />
        <div className='lane-container'>
          {
            lanes.map(lane => {
              const laneId = lane.id
              return (
                <Lane
                  key={laneId}
                  lane={lane}
                  tasks={tasksMap[laneId] || []}
                  moveTask={moveTask}
                  addTask={addTask}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}
