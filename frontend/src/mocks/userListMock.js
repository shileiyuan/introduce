import Mock from 'mockjs'
import mockRequest from '../utils/mockRequest'
import API from '../utils/API'

mockRequest.onGet(API.query_userList).reply(200, Mock.mock({
  'status': 0,
  'data|20-50': [{
    'id': '@guid',
    'name': '@cname',
    'age|1-100': 1
  }],
  total() {
    return this.data.length
  }
}))
