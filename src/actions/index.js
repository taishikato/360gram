export const LOGIN = 'login'
export const LOGOUT = 'logout'

export const loginUser = user => ({
  type: LOGIN,
  name: user.name,
  uid: user.uid,
  picture: user.picture
})
export const logoutUser = () => ({
  type: LOGOUT
})