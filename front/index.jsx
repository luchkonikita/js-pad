import './styles/index.sass'

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux'

import App from './components/app'
import reducers from './reducers/index'

document.addEventListener('DOMContentLoaded', () => {
  console.log('app initialization started')

  const loggerMiddleware = createLogger()
  const store = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore)(reducers)

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('content')
  )
})
