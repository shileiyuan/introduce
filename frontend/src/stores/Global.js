import { observable, action } from 'mobx'

export default class Global {
  @observable isLogined = true
  @observable username = 'admin'
  
  @action login = () => {
    this.isLogined = true
  }

  @action logout = () => {
    this.isLogined = false
  }
}
