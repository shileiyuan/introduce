import React from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Icon } from 'antd'
import { Transition } from 'react-transition-group'
import SideBar from './SideBar'
import AvatarBtn from './AvatarBtn'
import './index.less'

const { Content } = Layout

@inject('globalStore')
@observer
export default class Frame extends React.Component {
  state = {
    siderOpen: true,
    headerOpen: true
  }
  toggleSider = () => {
    this.setState({ siderOpen: !this.state.siderOpen })
  }
  toggleHeader = () => {
    this.setState({ headerOpen: !this.state.headerOpen })
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
      <div className='layout'>
        <div className='layout-header'>
          <Icon type={siderOpen ? 'double-right' : 'double-left'} onClick={this.toggleSider} className='sider-arrow' />
          <AvatarBtn name={userName} logout={logout} />
        </div>

        <Layout className='layout-container'>
          <Transition in={siderOpen} timeout={500}>
            {status => (
              <div className={cls('layout-sider', status)}>
                <SideBar pathname={pathname} />
              </div>
            )}
          </Transition>
          <Content className='layout-content'>
            {this.props.children}
          </Content>
        </Layout>
      </div>
    )
  }
}
