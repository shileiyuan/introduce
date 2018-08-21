import Mock from 'mockjs'
import mockRequest from '../utils/mockRequest'
import API from '../utils/API'

mockRequest.onGet(API.query_app).reply(200, Mock.mock({
  'status': 0,
  'data|3-6': [{
    'name': '@cname',
    'age|1-50': 1
  }]
}))


