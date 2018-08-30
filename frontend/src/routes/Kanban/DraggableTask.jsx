import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import CONFIG from '../../utils/config'
import Task from './Task'

const source = {
  beginDrag(props, monitor, component) {
    const { offsetHeight: height, offsetWidth: width } = findDOMNode(component)
    const { task, index } = props
    return { task, index, height, width }
  },
  endDrag(props, monitor) {
    document.getElementById(monitor.getItem().task.id).style.display = 'block'
  },
}
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview()
})

@DragSource(CONFIG.DND_TYPES.TASK, source, collect)
class DraggableTask extends Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage())
  }
  render() {
    const { task, index, connectDragSource, onClick, deleteTask } = this.props
    return (
      connectDragSource(
        <div id={task.id}>
          <Task task={task} index={index} onClick={onClick} deleteTask={deleteTask} />
        </div>
      )
    )
  }
}

export default DraggableTask
