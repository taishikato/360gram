import firebase from './firebase'

export default () => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user || false)
    })
  })
}