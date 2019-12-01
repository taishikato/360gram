import React from 'react';
import { Link } from "react-router-dom";
import logo from '../img/logo.png'
import Modal from 'react-modal'
import LoginModal from './LoginModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { PropsInterface } from '../container/LoggedinNavbar'
import './Navbar.scss'
import PostModal from './postModal/PostModal'

export default class Navbar extends React.Component<PropsInterface> {
  state = {
    showModal: false,
    showPostModal: false
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleOpenPostModal = () => {
    this.setState({ showPostModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
    this.setState({ showPostModal: false })
  }

  toggleBurger = () => {
    const burgerIcon = document.querySelector('.navbar-burger')
    const dropMenu = document.getElementById('nabvar-top')
    burgerIcon!.classList.toggle('is-active')
    dropMenu!.classList.toggle('is-active')
  }

  render() {
    const { isLogin, loginUser, logoutUser } = this.props
    return (
      <nav className="navbar has-shadow is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" id="logo" className="navbar-item">
              <img src={logo} alt="360gram" width="112" />
            </Link>

            {isLogin &&
              <a onClick={this.toggleBurger} role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            }
            {!isLogin &&
              <div className="navbar-item is-hidden-desktop">
                <a
                  className="button is-simple is-outlined is-rounded"
                  onClick={this.handleOpenModal}
                >
                  Log in / Sign up
                </a>
              </div>
            }
          </div>

            {isLogin ? (
              <div id="nabvar-top" className="navbar-menu">
                <div className="navbar-end">
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link is-arrowless">
                      <img src={loginUser.picture} className="is-rounded" width="32" />
                    </a>
                    <div className="navbar-dropdown">
                      <Link to={`/user/${loginUser.username}`} className="navbar-item">
                        Profile
                        </Link>
                      <Link to="/settings" className="navbar-item">
                        Settings
                        </Link>
                      <hr className="navbar-divider"></hr>
                      <a className="navbar-item" onClick={logoutUser}>
                        Logout
                        </a>
                    </div>
                  </div>
                  <div className="navbar-item">
                    <a onClick={this.handleOpenPostModal} id="upload-button" className="button is-simple is-outlined is-rounded is-medium">
                      <span className="icon">
                        <FontAwesomeIcon icon={faArrowUp} />
                      </span>
                      <span>
                        Upload
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div id="nabvar-top" className="navbar-menu is-hidden-mobile">
                <div className="navbar-end">
                  <div className="navbar-item">
                    <a
                      className="button is-simple is-outlined is-rounded"
                      onClick={this.handleOpenModal}
                    >
                      Log in/ Sign up
                    </a>
                  </div>
                </div>
              </div>
            )
            }
        </div >

        {/* Login Modal */}
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          ariaHideApp={false}
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

        {/* Post Modal */}
        <Modal
          isOpen={this.state.showPostModal}
          onRequestClose={this.handleCloseModal}
          ariaHideApp={false}
          style={{
            overlay: {
              zIndex: 100000,
              backgroundColor: 'rgba(0, 0, 0, 0.7)'
            },
            content: {
              width: '100%',
              maxWidth: '1200px',
              height: '550px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateY(-50%)translateX(-50%)',
              border: 'none',
              backgroundColor: '#f9f9f9'
            }
          }}
        >
          <PostModal />
        </Modal>
      </nav >
    )
  }
}
