import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import './LoginModal.scss'

export default class LoginModal extends Component {
  render() {
    return (
      <div id="login-modal">
        <a className="button is-google is-medium">
          <span className="icon fa-fw">
            <FontAwesomeIcon icon={faGoogle} />
          </span>
          <span>
            Continue With Google
          </span>
        </a>
        <a className="button is-facebook is-medium">
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