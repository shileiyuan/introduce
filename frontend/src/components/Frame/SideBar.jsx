import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

const Item = Menu.Item
export default class SideBar extends React.Component {
  render() {
    const { pathname, className } = this.props
    return (
      <Menu selectedKeys={[pathname]} className={cls('side-bar', { [className]: className !== undefined })}>
        <Item key='/UserList'><Link to='/UserList'><Icon type='user' /> UserList</Link></Item>
        <Item key='/Kanban'><Link to='/Kanban'><Icon type='credit-card' /> Kanban</Link></Item>
        <Item key='/Tetris'><Link to='/Tetris'><Icon type='layout' /> Tetris</Link></Item>
        <Item key='/Note'><Link to='/Note'><Icon type='file-text' /> Note</Link></Item>
      </Menu>
    )
  }
}
