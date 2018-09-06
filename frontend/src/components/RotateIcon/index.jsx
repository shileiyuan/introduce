import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import { Icon } from 'antd'
import './index.less'

class RotateIcon extends Component {
  static defaultProps = {
    type: 'up',
    timeout: '300ms',
    degree: '180deg'
  }
  render() {
    const { type, timeout } = this.props
    return (
      <div className='rotate-icon-wrapper'>
        <Transition timeout={timeout} >
          {state => (
            <Icon type={type} />
          )}
        </Transition>
      </div>
    )
  }
}

export default RotateIcon
