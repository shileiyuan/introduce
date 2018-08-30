import React, { Component } from 'react'
import { Input, Button } from 'antd'
import { findDOMNode } from 'react-dom'
import { observer, inject } from 'mobx-react'
import { DropTarget } from 'react-dnd'
import CONFIG from '../../utils/config'
import Task from './Task'
import DetailModal from './DetailModal'

const { TextArea } = Input
const { OFFSET_HEIGHT, CARD_HEIGHT, CARD_MARGIN } = CONFIG

function getPlaceholderIndex(y, scrollY) {
  const yPos = y - OFFSET_HEIGHT + scrollY
  let placeholderIndex
  if (yPos < CARD_HEIGHT / 2) {
    placeholderIndex = 0
  } else {
    placeholderIndex = Math.ceil((yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN))
  }
  return placeholderIndex
}

const target = {
  drop(props, monitor, component) {
    const item = monitor.getItem()
    const task = item.task
    const fromLaneId = task.laneId
    const fromIndex = item.index
    const toLaneId = props.lane.id
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
    const placeholderIndex = getPlaceholderIndex(y, findDOMNode(component).scrollTop)
    // const placeholderIndex = getPlaceholderIndex(y, component.refs.laneBody.scrollTop)
    component.setState({ placeholderIndex })
    const item = monitor.getItem()
    document.getElementById(item.task.id).style.display = 'none'
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

@DropTarget(CONFIG.DND_TYPES.TASK, target, collect)
@inject('globalStore')
@observer
class Lane extends Component {
  state = {
    placeholderIndex: undefined,
    currentTask: {},
    modalVisible: false,
    textAreaVisible: false,
    title: '',
  }
  componentDidMount() {
    console.log(this.laneBody)
  }

  toggleModal = modalVisible => {
    this.setState({ modalVisible })
  }

  openModal = task => {
    this.toggleModal(true)
    this.setState({ currentTask: task })
  }

  closeModal = () => {
    this.toggleModal(false)
    this.setState({ currentTask: {} })
  }

  toggleTextArea = textAreaVisible => {
    this.setState({ textAreaVisible })
  }

  showTextArea = () => {
    this.toggleTextArea(true)
  }

  handleTextAreaCancel = () => {
    this.toggleTextArea(false)
    this.setState({ title: '' })
  }

  handleTextAreaOK = () => {
    const { title } = this.state
    const { lane } = this.props
    this.props.addTask({
      title,
      laneId: lane.id,
      userId: this.props.globalStore.userId
    })
  }

  handleContentChagne = e => {
    this.setState({ title: e.target.value })
  }

  renderFooter = () => {
    const { textAreaVisible, title } = this.state
    if (textAreaVisible) {
      return (
        <div className='lane-footer'>
          <TextArea autosize value={title} onChange={this.handleContentChagne} />
          <div className='lane-footer-buttons'>
            <Button onClick={this.handleTextAreaCancel}>Cancel</Button>
            <Button type='primary' onClick={this.handleTextAreaOK}>OK</Button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='lane-footer'>
          <Button icon='plus' onClick={this.showTextArea}>add task</Button>
        </div>
      )
    }
  }

  render() {
    const { placeholderIndex, modalVisible, currentTask } = this.state
    const { lane, tasks, connectDropTarget, isOver } = this.props
    const placeholder = <div key='placeholder' className='task placeholder' />
    const taskList = []
    let isPlaceHold = false
    tasks.forEach((task, i) => {
      if (isOver) {
        isPlaceHold = false
        if (placeholderIndex === i) {
          taskList.push(placeholder)
        } else if (placeholderIndex > i) {
          isPlaceHold = true
        }
      }
      taskList.push(<Task key={task.id} task={task} index={i} onClick={this.openModal} />)
    })

    if (isOver && (isPlaceHold || tasks.length === 0)) {
      taskList.push(placeholder)
    }
    return (
      <div className='lane'>
        <h3 className='lane-title'>{lane.title}</h3>
        {
          connectDropTarget(
            <div className='lane-body'>
              {taskList}
            </div>
          )
        }
        {this.renderFooter()}
        <DetailModal visible={modalVisible} task={currentTask} onCancel={this.closeModal} />
      </div>
    )
  }
}

export default Lane
