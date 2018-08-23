import React, { Component } from 'react'
import Frame from '../components/Frame'
import UserList from './UserList'
import Kanban from './Kanban'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <Frame {...this.props}>
        <Switch>
          <Route path='/UserList' component={UserList} />
          <Route path='/Kanban' component={Kanban} />
          <Redirect path='/Home' to='/UserList' />
        </Switch>
      </Frame>
    )
  }
}
export default Home
