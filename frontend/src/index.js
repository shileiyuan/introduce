import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './routes/index'
import { configure } from 'mobx'
import '../assets/styles/index.less'

configure({
  enforceActions: true
})

if (process.env.NODE_ENV !== 'production') {
  // require('./mocks')
}
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>
    , document.getElementById('app-root')
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./routes/index', () => {
    render(App)
  })
}
