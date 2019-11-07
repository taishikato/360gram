import React from 'react';
import profile from './img/profile.svg'
import { Link } from "react-router-dom";
import logo from './img/logo.png'

export default class Navbar extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
      <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src={logo} alt="360gram" />
            </Link>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <Link to="/user/takato">
                  <img src={profile} className="is-rounded" width="32" />
                </Link>
              </div>
              <div className="navbar-item">
                <a className="button is-simple is-outlined is-rounded">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
