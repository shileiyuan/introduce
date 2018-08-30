import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'

const Item = Menu.Item
export default class SideBar extends React.Component {
  render() {
    return (
      <Menu selectedKeys={[this.props.pathname]} className='side-bar'>
        <Item key='/UserList'><Link to='/UserList'>UserList</Link></Item>
        <Item key='/Kanban'><Link to='/Kanban'>Kanban</Link></Item>
      </Menu>
    )
  }
}
