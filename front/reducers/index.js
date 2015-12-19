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

export default combineReducers({user, notification})
