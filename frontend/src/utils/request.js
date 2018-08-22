import axios from 'axios'
import { notification } from 'antd'
import CONFIG from '../utils/config'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  notification.error({
    message: `请求错误 ${response.status}: ${response.config.url}`,
    description: response.statusText
  })

  const error = new Error(response.statusText)

  error.response = response

  throw error
}
function catchError(error) {
  if (error.code) {
    notification.error({
      message: error.name,
      description: error.message
    })
  }
  if ('stack' in error && 'message' in error) {
    notification.error({
      description: error.message
    })
  }
  return error
}

function configRequest(config) {
  const token = localStorage.getItem(CONFIG.AUTH_TOKEN_STORAGE_KEY)
  if (config.url !== '/login' && token) {
    config.headers[CONFIG.AUTH_TOKEN_HEADER] = token
  }
  return config
}

const instance = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

instance.interceptors.request.use(configRequest)
// instance.interceptors.response.use(checkStatus, catchError)
instance.interceptors.response.use(res => res.data)

export default instance
