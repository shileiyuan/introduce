import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Menu } from 'antd'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import './index.less'
import Toolbar from './Toolbar'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value
  },
})

@inject('noteStore')
@observer
class Note extends Component {
  componentDidMount() {
    this.props.noteStore.getBooks()
  }
  handleClick = ({ item, key, keyPath }) => {
    const [noteId, bookId] = keyPath
    this.props.noteStore.getNoteById(bookId, noteId)
  }
  render() {
    const { books, article } = this.props.noteStore
    const html = marked(article.cells[0].data)
    return (
      <div className='note'>
        <Toolbar />
        <div className='note-catalog'>
          <Menu mode='inline' onClick={this.handleClick}>
            {
              books.map(book => {
                const { uuid: bookId, notes, name } = book
                return (
                  <SubMenu key={bookId} title={<div><span>{name}</span><span>{notes.length}</span></div>}>
                    {
                      notes.map(note => {
                        const { uuid, title, tags, createTime, updateTime } = note
                        return (
                          <MenuItem key={uuid}>{title}</MenuItem>
                        )
                      })
                    }
                  </SubMenu>
                )
              })
            }
          </Menu>
        </div>
        <div className='note-article' dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    )
  }
}

export default Note
