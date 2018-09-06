import React, { Component } from 'react'
import './index.less'
import Toolbar from './Toolbar'

class Note extends Component {
  render() {
    return (
      <div className='note'>
        <Toolbar />
      </div>
    )
  }
}

export default Note
