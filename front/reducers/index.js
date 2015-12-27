import _ from 'underscore'

import {combineReducers} from 'redux'
import actionTypes from '../action_types/index'

function user(state = {}, action) {
  switch (action.type) {
    case actionTypes.SUCCEED_LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        name: action.authData.github.username,
        avatarUrl: action.authData.github.profileImageURL
      })
    case actionTypes.SUCCEED_LOGOUT:
      return {
        isLoggedIn: false
      }
    default:
      return state
  }
}

function notification(state = {}, action) {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return Object.assign({}, state, action.notification)
    case actionTypes.HIDE_NOTIFICATION:
      return {}
    default:
      return state
  }
}

function results(state = [], action) {
  switch (action.type) {
    case actionTypes.SHOW_RESULTS:
      return state.concat(action.result)
    case actionTypes.RESET_RESULTS:
      return []
    default:
      return state
  }
}

function tasks(state = [], action) {
  switch (action.type) {
    case actionTypes.SHOW_TASKS:
      return Object.assign({}, state, {show: true})
    case actionTypes.SELECT_TASK:
      return Object.assign({}, state, {show: false, selectedTask: action.task})
    default:
      return state
  }
}

export default combineReducers({user, notification, results, tasks})
