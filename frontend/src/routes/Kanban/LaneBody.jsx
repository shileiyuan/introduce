import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { DropTarget } from 'react-dnd'
import CONFIG from '../../utils/config'
import DraggableTask from './DraggableTask'

const { OFFSET_HEIGHT, TASK_HEIGHT, TASK_MARGIN, DND_TYPES: { TASK } } = CONFIG
function getPlaceholderIndex(y, scrollY, headerExpand) {
  console.log(scrollY)
  // shift placeholder if y position more than card height / 2
  const offsetHeight = headerExpand ? OFFSET_HEIGHT : OFFSET_HEIGHT - 64
  const yPos = y - offsetHeight + scrollY
  let placeholderIndex
  if (yPos < TASK_HEIGHT / 2) {
    placeholderIndex = 0 // place at the start
  } else {
    placeholderIndex = Math.ceil((yPos - TASK_HEIGHT / 2) / (TASK_HEIGHT + TASK_MARGIN))
  }
  return placeholderIndex
}
const target = {
  drop(props, monitor, component) {
    const item = monitor.getItem()
    const task = item.task
    const fromLaneId = task.laneId
    const fromIndex = item.index
    const toLaneId = props.laneId
    let toIndex = component.state.placeholderIndex
    // 当从上往下移动的时候，toIndex需要减一
    if (fromLaneId === toLaneId && fromIndex < toIndex) {
      toIndex -= 1
    }
    if (fromLaneId === toLaneId && fromIndex === toIndex) return
    props.moveTask(task, fromLaneId, fromIndex, toLaneId, toIndex)
  },
  hover(props, monitor, component) {
    const { y } = monitor.getClientOffset()
    const headerExpand = component.props.headerExpand
    const scrollTop = document.querySelector('.layout-content').scrollTop
    const placeholderIndex = getPlaceholderIndex(y, scrollTop, headerExpand)
    component.setState({ placeholderIndex })
    const item = monitor.getItem()
    document.getElementById(item.task.id).style.display = 'none'
  }
}
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

@DropTarget(TASK, target, collect)
@observer
class LaneBody extends Component {
  state = {
    placeholderIndex: undefined
  }
  render() {
    const { placeholderIndex } = this.state
    const { tasks, connectDropTarget, isOver, onTaskClick, deleteTask, filterText, filterOwn, userId } = this.props
    const placeholder = <div key='placeholder' className='task placeholder' />
    const taskList = []
    let isPlaceHold = false
    tasks.filter(task => {
      return (!filterOwn || (filterOwn && task.userId === userId)) &&
        (!filterText || task.title.indexOf(filterText) > -1)
    })
      .forEach((task, i) => {
        if (isOver) {
          isPlaceHold = false
          if (placeholderIndex === i) {
            taskList.push(placeholder)
          } else if (placeholderIndex > i) {
            isPlaceHold = true
          }
        }
        taskList.push(<DraggableTask key={task.id} task={task} index={i} onClick={onTaskClick} deleteTask={deleteTask} />)
      })

    if (isOver && (isPlaceHold || tasks.length === 0)) {
      taskList.push(placeholder)
    }
    return (
      connectDropTarget(
        <div className='lane-body'>
          {taskList}
        </div>
      )
    )
  }
}

export default LaneBody
