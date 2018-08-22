import { observable, action, runInAction } from 'mobx'
import request from '../utils/request'
import API from '../utils/API'
import CONFIG from '../utils/config'

export default class Global {
  @observable isLogined = Boolean(localStorage.getItem(CONFIG.AUTH_TOKEN_STORAGE_KEY))
  @observable username = ''

  @action login = async ({ username, password }) => {
    const response = await request.post(API.login, { username, password })
    if (response.success) {
      runInAction(() => {
        this.isLogined = true
        this.username = response.data.username
        localStorage.setItem(CONFIG.AUTH_TOKEN_STORAGE_KEY, response.data.token)
      })
    }
  }

  @action logout = () => {
    this.isLogined = false
    localStorage.removeItem(CONFIG.AUTH_TOKEN_STORAGE_KEY)
  }

  @action getUserInfo = async () => {
    const response = await request.get(API.get_user_info)
    if (response.success) {
      this.username = response.data.username
    }
  }
}
