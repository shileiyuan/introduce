import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import store from './utils/store'
import Frame from './components/Frame'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Frame />
      </Provider>
    )
  }
}

export default App
