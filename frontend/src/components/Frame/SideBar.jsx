import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

const Item = Menu.Item
export default class SideBar extends React.Component {
  render() {
    return (
      <Menu style={{ paddingLeft: 40 }}>
        <Item><Link to='/UserList'>UserList</Link></Item>
        <Item><Link to='/Kanban'>Kanban</Link></Item>
      </Menu>
    )
  }
}
