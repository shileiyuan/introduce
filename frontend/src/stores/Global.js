import { observable, action, runInAction } from 'mobx'
import API from '../utils/API'
import CONFIG from '../utils/config'
import request from '../utils/request'

class Global {
  @observable isAuthed = Boolean(localStorage.getItem(CONFIG.AUTH_TOKEN_STORAGE_KEY))
  @observable userName = ''
  @observable userId = ''
  @observable headerExpand = true

  @action login = async ({ name, password }) => {
    const response = await request.post(API.login, { name, password })
    if (response.success) {
      runInAction(() => {
        this.isAuthed = true
        this.userName = response.data.name
        this.userId = response.data.id
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
    const response = await request.get(API.get_user_info)
    runInAction(() => {
      if (response.success) {
        this.isAuthed = true
        this.userName = response.data.name
        this.userId = response.data.id
      } else {
        this.logout()
      }
    })
    return response.success
  }

  @action toggleHeader = () => {
    this.headerExpand = !this.headerExpand
  }
}
export default new Global()
