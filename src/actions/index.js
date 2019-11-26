export const LOGIN = 'login'
export const LOGOUT = 'logout'

export const loginUser = user => ({
  type: LOGIN,
  name: user.displayName,
  uid: user.uid
})
export const logoutUser = () => ({
  type: LOGOUT
})