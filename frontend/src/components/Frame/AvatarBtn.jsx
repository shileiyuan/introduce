import React, { Component } from 'react'
import { Avatar, Dropdown, Menu, Icon } from 'antd'

class AvatarBtn extends Component {
  render() {
    const { name, logout } = this.props
    const menu = (
      <Menu>
        <Menu.Item key='logout' onClick={logout}>
          Log out
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <div className='avatar-container'>
          <Avatar size='large'>{name}</Avatar>
          <Icon type='down' />
        </div>
      </Dropdown >
    )
  }
}
export default AvatarBtn
