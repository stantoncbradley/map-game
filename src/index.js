import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/App'
import reducer from './reducers'
import './style/app.scss'

let store = createStore(reducer)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('main')
)
