import React, { Component } from 'react'
import { Icon } from 'antd'

class Task extends Component {
  state = {
    contentVisible: false
  }
  toggleContent = contentVisible => {
    this.setState({ contentVisible })
  }
  render() {
    const { title, userName, content, order } = this.props.task
    const { contentVisible } = this.state
    return (
      <div className='task'>
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
    )
  }
}

export default Task
