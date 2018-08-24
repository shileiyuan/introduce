import React from 'react'
import { observer, inject } from 'mobx-react'
import './index.less'
import Lane from './Lane'

@inject('kanbanStore')
@observer
export default class Kanban extends React.Component {
  componentDidMount() {
    this.props.kanbanStore.queryList()
  }
  render() {
    const { lanes, tasksMap } = this.props.kanbanStore
    return (
      <div className='kanban'>
        {
          lanes.map(lane => {
            const laneId = lane.id
            return <Lane key={laneId} lane={lane} tasks={tasksMap[laneId] || []} />
          })
        }
      </div>
    )
  }
}
