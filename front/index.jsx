import './styles/index.sass'

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux'

import App from './components/app'
import reducers from './reducers/index'
import {firebaseRef} from './firebase/index'

function prepareUserData(authData) {
  if (authData) {
    return {
      isLoggedIn: true,
      name: authData.github.username,
      avatarUrl: authData.github.profileImageURL
    }
  } else {
    return {
      isLoggedIn: false
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('app initialization started')

  const user = prepareUserData(firebaseRef.getAuth())
  const loggerMiddleware = createLogger()
  const store = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore)(reducers, {user})

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('content')
  )
})
