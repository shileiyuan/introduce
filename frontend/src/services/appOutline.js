import request from '../utils/request'
import API from '../utils/API'

export function getAppOutlineList() {
  return request.get(API.query_app)
}
