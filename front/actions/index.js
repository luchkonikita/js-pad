import actionTypes from '../action_types/index'
import {firebaseRef} from '../firebase/index'
import Runner from '../runner/index'

function initLogin() {
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

function initLogout() {
  return function(dispatch, getState) {
    firebaseRef.unauth()
    dispatch(showNotification({
      type: 'success',
      text: 'Successfully logged out'
    }))
    dispatch(succeedLogout())
  }
}

function succeedLogin(authData) {
  return {
    type: actionTypes.SUCCEED_LOGIN,
    authData
  }
}

function succeedLogout() {
  return {
    type: actionTypes.SUCCEED_LOGOUT
  }
}

function showNotification(notification) {
  return {
    type: actionTypes.SHOW_NOTIFICATION,
    notification
  }
}

function hideNotification() {
  return {
    type: actionTypes.HIDE_NOTIFICATION
  }
}

function runCode(code) {
  return function(dispatch, getState) {
    dispatch(resetResults())
    new Runner(code)
      .onValue(r => dispatch(showResult(r)))
      .run()
  }
}

function showResult(result) {
  return {
    type: actionTypes.SHOW_RESULTS,
    result
  }
}

function resetResults() {
  return {
    type: actionTypes.RESET_RESULTS
  }
}

function showTasks() {
  return {
    type: actionTypes.SHOW_TASKS
  }
}

function selectTask(task) {
  return {
    type: actionTypes.SELECT_TASK,
    task
  }
}

export default {
  initLogin,
  initLogout,
  succeedLogin,
  succeedLogout,
  showNotification,
  hideNotification,
  runCode,
  showResult,
  resetResults,
  showTasks,
  selectTask
}
