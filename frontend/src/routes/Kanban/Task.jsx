import React, { Component } from 'react'
import { Icon } from 'antd'
import { DragSource, DropTarget } from 'react-dnd'
import CONFIG from '../../utils/config'

const source = {
  beginDrag(props) {
    return props.task
  }
}
const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

const target = {
  drop(props, monitor) {
    props.dropTask(monitor.getItem(), props.task)
  },
  canDrop(props, monitor) {
    // const task = props.task
    // const sourceTask = monitor.getItem()
    // return task.id !== sourceTask.id
    return props.task.id === CONFIG.PLACE_HOLDER_ID
  }
}
const targetCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    sourceTask: monitor.getItem() || {}
  }
}

@DragSource(CONFIG.DND_TYPES.TASK, source, sourceCollect)
@DropTarget(CONFIG.DND_TYPES.TASK, target, targetCollect)
class Task extends Component {
  state = {
    contentVisible: false
  }
  toggleContent = contentVisible => {
    this.setState({ contentVisible })
  }
  componentWillReceiveProps(nextProps) {
    const { sourceTask, task: targetTask, isOver } = this.props
    //  && targetTask.id !== CONFIG.PLACE_HOLDER_ID
    if (isOver !== nextProps.isOver && targetTask.id !== sourceTask.id && targetTask.id !== CONFIG.PLACE_HOLDER_ID) {
      if (nextProps.isOver === true) {
        console.log('target is over..............', targetTask.id)
        this.props.overTargetTask(sourceTask, targetTask)
      } else {
        // this.props.
      }
    }
    // if (isOver === false && nextProps.isOver === true && task.id !== sourceTask.id && task.id !== CONFIG.PLACE_HOLDER_ID) {
    //   console.log('target is over..............')
    //   this.props.overTargetTask(sourceTask, task)
    // } else if (false) {

    // }
  }
  render() {
    const { task, connectDragSource, connectDropTarget, isOver, isDragging } = this.props
    const { title, userName, content, order } = task
    const { contentVisible } = this.state
    return (
      connectDragSource(connectDropTarget(
        <div className={cls('task', { 'is-over': isOver, 'is-dragging': isDragging })}>
          <div className='task-header'>
            <div className='order'>{order}</div>
            <div className='avatar'>{userName}</div>
          </div>
          <div className='task-title'>{title}</div>
          {
            contentVisible
              ? <div className='task-content'>
                {content}
                <div className='arrow'><Icon type='up' onClick={() => this.toggleContent(false)} /></div>
              </div>
              : <div className='arrow'><Icon type='down' onClick={() => this.toggleContent(true)} /></div>
          }
        </div>
      ))
    )
  }
}

export default Task
