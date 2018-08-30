import React, { Component } from 'react'
import { Input, Checkbox } from 'antd'

class Toolbar extends Component {
  render() {
    const { handleFilterTextChange, filterText, filterOwn, handleFilterOwnChange } = this.props
    return (
      <div className='tool-bar'>
        <div className='tool-bar-filter-own'>
          <Checkbox
            onChange={e => handleFilterOwnChange(e.target.checked)}
            value={filterOwn}
          >
            Show Own
          </Checkbox>
        </div>
        <div className='tool-bar-filter'>
          <Input
            value={filterText}
            onChange={e => handleFilterTextChange(e.target.value)}
            placeholder='filter text...'
          />
        </div>
      </div>
    )
  }
}

export default Toolbar
