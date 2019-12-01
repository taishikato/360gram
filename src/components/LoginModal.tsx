import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import './LoginModal.scss'
import firebase from '../plugins/firebase'
const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

export default class LoginModal extends Component {
  googleLogin = () => {
    firebase.auth().signInWithRedirect(googleProvider)
  }
  facebookLogin = () => {
    firebase.auth().signInWithRedirect(facebookProvider)
  }

  render() {
    return (
      <div id="login-modal">
        <a
          className="button is-google is-medium"
          onClick={this.googleLogin}
        >
          <span className="icon fa-fw">
            <FontAwesomeIcon icon={faGoogle} />
          </span>
          <span>
            Continue With Google
          </span>
        </a>
        <a
          className="button is-facebook is-medium"
          onClick={this.facebookLogin}
        >
          <span className="icon fa-fw">
            <FontAwesomeIcon icon={faFacebookSquare} />
          </span>
          <span>
            Continue With Facebook
          </span>
        </a>
        <p>
          We'll never post to your account without your permission.
        </p>
      </div>
    )
  }
}