import firebase from './firebase'

export default () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}