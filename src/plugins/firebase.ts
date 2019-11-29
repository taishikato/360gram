import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDigDLB7Q-bSBReJXPV2GG6BKATfAnd10k",
    authDomain: "the360gram.firebaseapp.com",
    databaseURL: "https://the360gram.firebaseio.com",
    projectId: "the360gram",
    storageBucket: "the360gram.appspot.com",
    messagingSenderId: "929298874227",
    appId: "1:929298874227:web:a9a79a1c10ae8f60e5cf06"
  })
}
export default firebase