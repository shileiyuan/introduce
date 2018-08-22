import React from 'react'
import './index.less'
import { observer, inject } from 'mobx-react'
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
      lanes.map(lane => {
        const laneId = lane.id
        return <Lane key={laneId} lane={lane} tasks={tasksMap[laneId] || []} />
      })
    )
  }
}
