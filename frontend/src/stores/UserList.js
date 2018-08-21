import { observable, action, runInAction } from 'mobx'
import { queryUserList } from '../services/UserList'

export default class AppOutline {
  @observable userList = []
  @observable total = 0

  @action async queryUserList() {
    const response = await queryUserList()
    runInAction(() => {
      this.userList = response.data
      this.total = response.total
    })
  }
}
