import React from 'react'
import { Provider, observer } from 'mobx-react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import store from '../stores'
import Login from './Login'

import Home from './Home'

window.store = store

@observer
export default class Root extends React.Component {
  render() {
    const { isAuthed } = store.globalStore
    return (
      <Provider {...store}>
        <Router>
          <Switch>
            <Route path='/Login' render={() => isAuthed ? <Redirect to='/Home' /> : <Login />} />
            <Route path='/Home' render={props => isAuthed ? <Home {...props} /> : <Redirect to='/Login' />} />
            <Route render={props => isAuthed
              ? <Home {...props} />
              : <Redirect to='/Login' />} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
