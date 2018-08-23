import axios from 'axios'
import CONFIG from '../utils/config'
import globalStore from '../stores/Global'

function catchError(error) {
  const { response } = error
  if (response.status === 403) {
    globalStore.logout()
  }
  return response.data
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
instance.interceptors.response.use(res => res.data, catchError)

export default instance
