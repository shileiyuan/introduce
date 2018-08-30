import React from 'react'
import { observer, inject } from 'mobx-react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './index.less'
import Lane from './Lane'
import Toolbar from './Toolbar'
import CustomDragLayer from './CustomDragLayer'

@DragDropContext(HTML5Backend)
@inject('kanbanStore', 'globalStore')
@observer
export default class Kanban extends React.Component {
  state = {
    filterText: '',
    filterOwn: false
  }
  handleFilterTextChange = filterText => {
    this.setState({ filterText })
  }
  handleFilterOwnChange = filterOwn => {
    this.setState({ filterOwn })
  }
  componentDidMount() {
    this.props.kanbanStore.queryList()
  }
  render() {
    const { userId } = this.props.globalStore
    const { lanes, tasksMap, moveTask, addTask, deleteTask } = this.props.kanbanStore
    const { filterText, filterOwn } = this.state
    return (
      <div className='kanban'>
        <Toolbar
          handleFilterTextChange={this.handleFilterTextChange}
          filterText={filterText}
          handleFilterOwnChange={this.handleFilterOwnChange}
          filterOwn={filterOwn}
        />
        <div className='lane-container'>
          <CustomDragLayer />
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
                  deleteTask={deleteTask}
                  filterText={filterText}
                  filterOwn={filterOwn}
                  userId={userId}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}
