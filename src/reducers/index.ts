import { combineReducers } from 'redux'
import { LOGIN, LOGOUT } from '../actions'

const loginUser = (state = {}, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        uid: action.uid,
        name: action.name,
        picture: action.picture,
        username: action.username,
        bio: action.bio
      }
      case LOGOUT:
        return {}
    default:
      return state
  }
}

const isLogin = (state = false, action: any) => {
  switch (action.type) {
    case LOGIN:
      return true
    case LOGOUT:
      return false
    default:
      return state
  }
}

export interface UserInterface {
  name: string,
  uid: string,
  picture: string,
  username: string,
  bio? : string,
  created?: Number
}

export interface StateInterface {
  isLogin: Boolean,
  loginUser: UserInterface
}

export default combineReducers({
  loginUser,
  isLogin
})