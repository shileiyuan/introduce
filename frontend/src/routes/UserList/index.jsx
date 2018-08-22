import React, { Component } from 'react'
import { Table, Pagination } from 'antd'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import './index.less'

const PAGE_SIZE = 3

@inject('userListStore')
@observer
class UserList extends Component {
  state = {
    current: 1,
    pageSize: PAGE_SIZE
  }
  componentDidMount() {
    this.props.userListStore.queryUserList()
  }
  getDataSource = (userList, current, total, pageSize) => {
    const startIndex = (current - 1) * pageSize
    return userList.slice(startIndex, startIndex + pageSize)
  }
  handlePageChange = (current, pageSize) => {
    this.setState({ current })
  }
  handleSizeChange = (current, pageSize) => {
    const { total } = this.props.userListStore
    current = Math.min(current, Math.ceil(total / pageSize))
    this.setState({ current, pageSize })
  }
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'username'
      },
      {
        title: 'Age',
        dataIndex: 'age'
      },
      {
        title: 'Update time',
        dataIndex: 'updateTime'
      }
    ]
    const { userList, total } = this.props.userListStore
    const { current, pageSize } = this.state
    const paginationProps = {
      current,
      total,
      pageSize,
      onChange: this.handlePageChange,
      showQuickJumper: true,
      showSizeChanger: true,
      onShowSizeChange: this.handleSizeChange,
      showTotal: total => `共 ${total} 条`,
      pageSizeOptions: ['5', '8', '10', '15', '20', '50', '100'],
      // hideOnSinglePage: true,
      // simple: true
      itemRender: (current, type, originalElement) => {
        if (type === 'prev') {
          return <a>Previous</a>
        } if (type === 'next') {
          return <a>Next</a>
        }
        return originalElement
      },
      className: 'user-pagination'
    }
    const dataSource = this.getDataSource(userList, current, total, pageSize)
    return (
      <div className='page-user-list'>
        <Table dataSource={toJS(dataSource)} columns={columns} rowKey='id' pagination={false} />
        <Pagination {...paginationProps} />
      </div>
    )
  }
}

export default UserList
