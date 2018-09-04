import React, { Component } from 'react'
import marked from 'marked'
import highlight from 'highlight.js'
import './index.less'
import 'highlight.js/styles/atom-one-dark.css'

marked.setOptions({
  // renderer: new marked.Renderer(),
  highlight: function(code) {
    return highlight.highlightAuto(code).value
  },
})

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
    const html = marked(this.state.text)
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
