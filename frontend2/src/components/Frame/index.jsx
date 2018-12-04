import React, { Component } from 'react'
import './index.less'

class Frame extends Component {
  render() {
    return (
      <div id='layout'>
        <div id='layout-header'>header</div>
        <div id='layout-body'>
          <div id='layout-sider'>sider</div>
          <div id='layout-content'>
            <div className='item'>item</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Frame
