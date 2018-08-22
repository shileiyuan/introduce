import React, { Component } from 'react'

class Task extends Component {
  render() {
    const { title } = this.props.data
    return (
      <div>
        <div>{title}</div>
      </div>
    )
  }
}

export default Task
