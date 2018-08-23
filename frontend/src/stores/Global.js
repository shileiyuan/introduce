import { observable, action, runInAction } from 'mobx'
import API from '../utils/API'
import CONFIG from '../utils/config'
import request from '../utils/request'

class Global {
  @observable isAuthed = Boolean(localStorage.getItem(CONFIG.AUTH_TOKEN_STORAGE_KEY))
  @observable username = ''

  @action login = async ({ username, password }) => {
    const response = await request.post(API.login, { username, password })
    if (response.success) {
      runInAction(() => {
        this.isAuthed = true
        this.username = response.data.username
        localStorage.setItem(CONFIG.AUTH_TOKEN_STORAGE_KEY, response.data.token)
      })
    }
    return response.success
  }

  @action logout = () => {
    this.isAuthed = false
    localStorage.removeItem(CONFIG.AUTH_TOKEN_STORAGE_KEY)
  }

  @action getUserInfo = async () => {
    console.log('getUserInfo')
    const response = await request.get(API.get_user_info)
    if (response.success) {
      this.username = response.data.username
      this.isAuthed = true
    } else {
      this.logout()
    }
    return response.success
  }
}
export default new Global()
