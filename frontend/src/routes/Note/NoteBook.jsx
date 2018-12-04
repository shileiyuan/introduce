import React, { Component } from 'react'
import { Menu } from 'antd'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
class NoteBook extends Component {
  render() {
    const { name, notes, uuid: bookId } = this.props
    const notesCount = notes.length
    return (
      <SubMenu key={bookId} title={<div><span>{name}</span><span>{notesCount}</span></div>}>
        {
          notes.map(note => {
            const { uuid: noteId, title, tags, createTime, updateTime } = note
            return (
              <MenuItem key={noteId}>{title}</MenuItem>
            )
          })
        }
      </SubMenu>
    )
  }
}

export default NoteBook
