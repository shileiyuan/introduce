import { observable, action, runInAction } from 'mobx'
import request from '../utils/request'
import API from '../utils/API'

export default class Global {
  @observable isLogined = false
  @observable username = ''

  @action login = async ({ username, password }) => {
    try {
      const user = await request.post(API.login, { username, password })
      if(user) {
        runInAction(() => {
          this.isLogined = true
          this.username = user.username
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  @action logout = () => {
    this.isLogined = false
  }
}
