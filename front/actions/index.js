import actionTypes from '../action_types/index'
import {firebaseRef} from '../firebase/index'
import Runner from '../runner/index'

export function initLogin() {
  return function(dispatch, getState) {
    firebaseRef.authWithOAuthPopup('github', (error, authData) => {
      if (error) {
        dispatch(showNotification({
          type: 'error',
          text: 'Can not authenticate user'
        }))
      } else {
        const id = authData.uid
        const provider = authData.provider
        const name = authData.github.username
        firebaseRef.child('users').child(authData.uid).set({id, provider, name}, (error) => {
          if (error) {
            dispatch(showNotification({
              type: 'error',
              text: 'Can not authenticate user'
            }))
          } else {
            dispatch(showNotification({
              type: 'success',
              text: 'Successfully logged in'
            }))
            dispatch(succeedLogin(authData))
          }
        })
      }
    })
  }
}

export function initLogout() {
  return function(dispatch, getState) {
    firebaseRef.unauth()
    dispatch(showNotification({
      type: 'success',
      text: 'Successfully logged out'
    }))
    dispatch(succeedLogout())
  }
}

export function succeedLogin(authData) {
  return {
    type: actionTypes.SUCCEED_LOGIN,
    authData
  }
}

export function succeedLogout() {
  return {
    type: actionTypes.SUCCEED_LOGOUT
  }
}

export function showNotification(notification) {
  return {
    type: actionTypes.SHOW_NOTIFICATION,
    notification
  }
}

export function hideNotification() {
  return {
    type: actionTypes.HIDE_NOTIFICATION
  }
}

export function runCode(code) {
  return function(dispatch, getState) {
    dispatch(resetResults())
    new Runner(code)
      .onValue(r => dispatch(showResult(r)))
      .run()
  }
}

export function showResult(result) {
  return {
    type: actionTypes.SHOW_RESULTS,
    result
  }
}

export function resetResults() {
  return {
    type: actionTypes.RESET_RESULTS
  }
}
