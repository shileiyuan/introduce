import React from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Icon } from 'antd'
import SideBar from './SideBar'
import AvatarBtn from './AvatarBtn'
import './index.less'

const { Header, Sider, Content } = Layout

@inject('globalStore')
@observer
export default class Frame extends React.Component {
  state = {
    siderOpen: true
  }
  toggleSider = siderOpen => {
    this.setState({ siderOpen })
  }
  componentDidMount() {
    const { getUserInfo, userName } = this.props.globalStore
    if (!userName) {
      getUserInfo()
    }
  }
  render() {
    const { userName, logout } = this.props.globalStore
    const { pathname } = this.props.location
    const { siderOpen } = this.state
    return (
      <Layout className='layout'>
        <Header className='layout-header'>
          {
            siderOpen
              ? <Icon type='double-right' onClick={() => this.toggleSider(false)} />
              : <Icon type='double-left' onClick={() => this.toggleSider(true)} />
          }
          <AvatarBtn name={userName} logout={logout} />
        </Header>
        <Layout className='layout-container'>
          {siderOpen && <Sider className='layout-sider'>
            <SideBar pathname={pathname} />
          </Sider>}
          <Content className='layout-content'>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
