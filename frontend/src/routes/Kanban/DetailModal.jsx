import React, { Component } from 'react'
import { Modal } from 'antd'
class DetailModal extends Component {
  render() {
    const { visible, onCancel } = this.props
    const { content, title } = this.props.task
    return (
      <Modal visible={visible} onCancel={onCancel} title={title}>
        {content}
      </Modal>
    )
  }
}

export default DetailModal
