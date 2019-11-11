import React from 'react';
import profile from '../img/profile.svg'
import { Link } from "react-router-dom";
import logo from '../img/logo.png'
import Modal from 'react-modal'
import LoginModal from './LoginModal'

export default class Navbar extends React.Component {
  state = {
    showModal: false
  }

  handleOpenModal = () => {
    console.log('handleOpenModal')
    this.setState({ showModal: true })
    console.log(this.state.showModal)
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <nav className="navbar has-shadow is-fixed-top" role="navigation" aria-label="main navigation">
        < div className="container" >
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src={logo} alt="360gram" width="112" />
            </Link>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link is-arrowless">
                  <img src={profile} className="is-rounded" width="32" />
                </a>
                <div className="navbar-dropdown">
                  <Link to="/user/takato" className="navbar-item">
                    Profile
                  </Link>
                  <Link to="/settings" className="navbar-item">
                    Settings
                  </Link>
                  <hr className="navbar-divider"></hr>
                  <a className="navbar-item">
                    Logout
                  </a>
                </div>
              </div>
              <div className="navbar-item">
                <a
                  className="button is-simple is-outlined is-rounded"
                  onClick={this.handleOpenModal}
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div >

        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          style={{
            overlay: {
              zIndex: 100000,
              backgroundColor: 'rgba(0, 0, 0, 0.7)'
            },
            content: {
              width: '600px',
              maxWidth: '100%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateY(-50%)translateX(-50%)',
              border: 'none',
              backgroundColor: 'transparent'
            }
          }}
        >
          <LoginModal />
        </Modal>
      </nav >
    )
  }
}
