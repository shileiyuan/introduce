import React, { Component } from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Frame from '../components/Frame'
import UserList from './UserList'
import Kanban from './Kanban'
import Tetris from './Tetris'

class Home extends Component {
  render() {
    return (
      <Frame {...this.props}>
        <Switch>
          <Route path='/UserList' component={UserList} />
          <Route path='/Kanban' component={Kanban} />
          <Route path='/Tetris' component={Tetris} />
          <Redirect path='/Home' to='/UserList' />
        </Switch>
      </Frame>
    )
  }
}
export default Home
