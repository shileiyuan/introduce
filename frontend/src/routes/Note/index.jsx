import React, { Component } from 'react'
import marked from 'marked'
import './index.less'

class Note extends Component {
  state = {
    text: '',
    html: ''
  }
  handleChange = e => {
    const text = e.target.value
    this.setState({ text })
    this.update()
  }
  update = _.debounce(() => {
    const html = marked(this.state.text, {
      sanitize: true
    })
    this.setState({ html })
  }, 100)
  render() {
    const { text, html } = this.state
    return (
      <div className='note'>
        <textarea className='editor' value={text} onChange={this.handleChange} />
        <div dangerouslySetInnerHTML={{ __html: html }} className='present' />
      </div>
    )
  }
}

export default Note
