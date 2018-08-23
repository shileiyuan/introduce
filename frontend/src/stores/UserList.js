import { observable, action, runInAction } from 'mobx'
import request from '../utils/request'
import API from '../utils/API'

class UserList {
  @observable userList = []
  @observable total = 0

  @action async queryUserList() {
    const response = await request(API.query_userList)
    runInAction(() => {
      if (response.success) {
        this.userList = response.data
        this.total = response.total
      }
    })
  }
}

export default new UserList()
