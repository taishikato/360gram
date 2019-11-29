import { UserInterface } from '../reducers'
export const LOGIN = 'login'
export const LOGOUT = 'logout'

export const loginUser = (user: UserInterface) => ({
  type: LOGIN,
  name: user.name,
  uid: user.uid,
  picture: user.picture,
  username: user.username,
  bio: user.bio
})
export const logoutUser = () => ({
  type: LOGOUT
})