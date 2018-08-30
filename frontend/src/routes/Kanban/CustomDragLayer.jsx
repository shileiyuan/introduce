import React, { Component } from 'react'
import { DragLayer } from 'react-dnd'
import TaskDragPreview from './TaskDragPreview'
import CONFIG from '../../utils/config'

const layerStyles = {
  // border: '1px solid black',
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100000,
  left: 0,
  top: 0,
  width: 0,
  height: 0
}

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    }
  }
  let { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform
  }
}
const collect = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
})

@DragLayer(collect)
class CustomDragLayer extends Component {
  renderItem(type, item) {
    switch (type) {
      case CONFIG.DND_TYPES.TASK:
        return (
          <TaskDragPreview {...item} />
        )
      default:
        return null
    }
  }
  render() {
    const { item, itemType, isDragging } = this.props

    if (!isDragging) {
      return null
    }
    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    )
  }
}

export default CustomDragLayer
