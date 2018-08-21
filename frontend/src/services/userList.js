import request from '../utils/request'
import API from '../utils/API'

export function queryUserList() {
  return request.get(API.query_userList)
}
