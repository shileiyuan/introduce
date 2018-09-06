import React, { Component } from 'react'
import { Input, Button } from 'antd'
import { observer } from 'mobx-react'
import DetailModal from './DetailModal'
import LaneBody from './LaneBody'

const { TextArea } = Input

@observer
class Lane extends Component {
  state = {
    currentTask: {},
    modalVisible: false,
    textAreaVisible: false,
    title: '',
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
      laneId: lane.id
    }).then(() => {
      this.setState({ title: '' })
    })
  }
  handleKeyPress = e => {
    if (e.key === 'Enter' && e.shiftKey === true) {
      e.preventDefault()
      this.handleTextAreaOK()
      this.handleTextAreaCancel()
    }
  }
  handleKeyKown = e => {
    if (e.key === 'Escape') {
      e.preventDefault()
      this.handleTextAreaCancel()
    }
  }

  handleTitleChagne = e => {
    this.setState({ title: e.target.value })
  }
  renderFooter = () => {
    const { textAreaVisible, title } = this.state
    if (textAreaVisible) {
      return (
        <div className='lane-footer'>
          <TextArea
            autosize
            value={title}
            onChange={this.handleTitleChagne}
            onKeyDown={this.handleKeyKown}
            onKeyPress={this.handleKeyPress}
            autoFocus
          />
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
    const { modalVisible, currentTask } = this.state
    const { lane, tasks, moveTask, deleteTask, filterText, filterOwn, userId, headerExpand } = this.props
    return (
      <div className='lane'>
        <h3 className='lane-title'>{lane.title}</h3>
        <LaneBody
          tasks={tasks}
          laneId={lane.id}
          moveTask={moveTask}
          onTaskClick={this.openModal}
          deleteTask={deleteTask}
          filterText={filterText}
          filterOwn={filterOwn}
          userId={userId}
          headerExpand={headerExpand}
        />
        {this.renderFooter()}
        <DetailModal visible={modalVisible} task={currentTask} onCancel={this.closeModal} />
      </div>
    )
  }
}

export default Lane
