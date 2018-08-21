import React from 'react'
import { observer, inject } from 'mobx-react'
import { Layout } from 'antd'
import SideBar from './SideBar'
import AvatarBtn from './AvatarBtn'
import './index.less'

const { Header, Sider, Content } = Layout

@inject('globalStore')
@observer
export default class Frame extends React.Component {
  render() {
    const { username, logout } = this.props.globalStore
    return (
      <Layout className='layout'>
        <Header className='layout-header'>
          Header
          <AvatarBtn username={username} logout={logout} />
        </Header>
        <Layout className='layout-container'>
          <Sider className='layout-sider'><SideBar /></Sider>
          <Content className='layout-content'>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
