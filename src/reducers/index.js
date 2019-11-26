import { combineReducers } from 'redux'
import { LOGIN, LOGOUT } from '../actions'

const loginUser = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        uid: action.uid,
        name: action.name,
        picture: action.picture
      }
    default:
      return state
  }
}

const isLogin = (state = false, action) => {
  switch (action.type) {
    case LOGIN:
      return true
    case LOGOUT:
      return false
    default:
      return state
  }
}

export default combineReducers({
  loginUser,
  isLogin
})