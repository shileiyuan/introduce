import React, { Component } from 'react'
import { Icon } from 'antd'
import { DragSource } from 'react-dnd'
import CONFIG from '../../utils/config'

const source = {
  beginDrag(props) {
    const { task, index } = props
    return { task, index }
  },
  endDrag(props, monitor) {
    document.getElementById(monitor.getItem().task.id).style.display = 'block'
  },
}
const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

@DragSource(CONFIG.DND_TYPES.TASK, source, sourceCollect)
class Task extends Component {
  state = {
    contentVisible: false
  }
  toggleContent = contentVisible => {
    this.setState({ contentVisible })
  }
  render() {
    const { task, connectDragSource, isOver, isDragging } = this.props
    const { title, userName, content, order, id } = task
    const { contentVisible } = this.state
    return (
      connectDragSource(
        <div className={cls('task', { 'is-over': isOver, 'is-dragging': isDragging })} id={id}>
          <div className='task-header'>
            {/* <div className='order'>{id}</div> */}
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
      )
    )
  }
}

export default Task
