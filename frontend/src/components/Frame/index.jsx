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
    siderExpand: true,
    delayExpandHeader: true
  }
  toggleSider = () => {
    this.setState({ siderExpand: !this.state.siderExpand })
  }
  toggleHeader = () => {
    this.props.globalStore.toggleHeader()
    const { delayExpandHeader } = this.state
    if (delayExpandHeader) {
      // 如果现在header是展开的状态，那么点击之后，layoutContent的高度是要从小变大的
      // 因为header高度是渐变的，所以layoutContent的高度的变大也必须要滞后，才能避免出现滚动条
      setTimeout(() => {
        this.setState({ delayExpandHeader: !delayExpandHeader })
      }, 500)
    } else {
      this.setState({ delayExpandHeader: !delayExpandHeader })
    }
  }
  componentDidMount() {
    const { getUserInfo, userName } = this.props.globalStore
    if (!userName) {
      getUserInfo()
    }
  }
  render() {
    const { userName, logout, headerExpand } = this.props.globalStore
    const { pathname } = this.props.location
    const { siderExpand, delayExpandHeader } = this.state
    return (
      <div className='layout'>
        <Transition in={headerExpand} timeout={500}>
          {status => (
            <div>
              <div className={cls('layout-header', status)}>
                <AvatarBtn name={userName} logout={logout} />
              </div>
              <div className={cls('expand-header-arrow-wrapper', status)} onClick={this.toggleHeader}>
                <Icon
                  type={headerExpand ? 'double-left' : 'double-right'}
                  className='expand-header-arrow'
                />
              </div>
            </div>
          )}
        </Transition>

        <Layout className='layout-container'>
          <Transition in={siderExpand} timeout={500}>
            {status => (
              <div className={cls('layout-sider', status)}>
                <div className={cls('expand-sider-wrapper', status)} onClick={this.toggleSider}>
                  <Icon type={siderExpand ? 'double-right' : 'double-left'} className='sider-arrow' />
                </div>
                <SideBar pathname={pathname} className={status} />
              </div>
            )}
          </Transition>
          <Content className='layout-content' style={{ height: `calc(100vh - ${delayExpandHeader ? '94px' : '30px'})` }}>
            {/* {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {
                  headerExpand
                })
              })
            } */}
            {this.props.children}
          </Content>
        </Layout>
      </div>
    )
  }
}
