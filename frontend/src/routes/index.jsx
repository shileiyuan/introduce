import React from 'react'
import { Provider, observer } from 'mobx-react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import store from '../stores/index'
import Frame from '../components/Frame/index'
import UserList from './UserList'
import Login from './Login'

const { stores, Stores } = store
@observer
export default class App extends React.Component {
  componentDidMount() {
    const { isLogined } = stores.globalStore
    if (isLogined) {
      stores.globalStore.getUserInfo()
    }
  }

  render() {
    const { isLogined } = stores.globalStore
    return (
      <Provider {...stores} {...Stores}>
        <Router>
          {
            isLogined
              ? <Frame>
                <Switch>
                  <Route path='/UserList' component={UserList} />
                  <Redirect to='/UserList' />
                </Switch>
              </Frame>
              : <Switch>
                <Route path='/Login' component={Login} />
                <Redirect to='/Login' />
              </Switch>
          }
        </Router>
      </Provider>
    )
  }
}
