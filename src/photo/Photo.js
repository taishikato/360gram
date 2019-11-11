import React from 'react'
import Modal from 'react-modal'
import PhotoShareModal from '../components/PhotoShareModal'
import { Pannellum } from "pannellum-react";
import myImage from "../img/360.JPG";
import woq from "../img/woq.jpg"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShareSquare } from '@fortawesome/free-regular-svg-icons'
// import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import './Photo.scss'

export default class Profile extends React.Component {
  state = {
    isOpenPhotoMenuModal: false
  }

  handleCloseModal = () => {
    this.setState({ isOpenPhotoMenuModal: false })
  }

  handleOpenPhotoShareModal = () => {
    this.setState({ isOpenPhotoMenuModal: true })
  }

  render() {
    return (
      <div id="photo-page">
        <Pannellum
          width="100%"
          height="500px"
          image={myImage}
          pitch={10}
          yaw={180}
          hfov={300}
          vaov={180}
          autoLoad
          onLoad={() => {
            console.log("panorama loaded");
          }}
        >
        </Pannellum>

        <div className="column is-10 container">
          <div id="photo-tools" className="flex">
            <a className="photo-tools-item">
              <span className="icon is-medium">
                <FontAwesomeIcon icon={faHeart} size="lg" />
              </span>
            </a>
            <a className="photo-tools-item" onClick={this.handleOpenPhotoShareModal}>
              <span className="icon is-medium">
                <FontAwesomeIcon icon={faShareSquare} size="lg" />
              </span>
            </a>
            {/* <a className="photo-tools-item">
              <span className="icon is-medium">
                <FontAwesomeIcon icon={faEllipsisH} size="lg" />
              </span>
            </a> */}
          </div>
          <div className="columns is-variable is-8">
            <div className="column is-6">
              <div className="flex flex-center flex-j-space">
                <div>
                  <p className="has-text-weight-semibold is-size-4">
                    Luang Prabang Sunset
                  </p>
                  <p>
                    by <Link to="/user/takato">Taishi kato</Link>
                  </p>
                </div>
                <figure className="image is-64x64">
                  <Link to="/user/takato">
                    <img className="is-rounded" src="https://bulma.io/images/placeholders/64x64.png" alt="" />
                  </Link>
                </figure>
              </div>
              <div className="is-devider"></div>
              <div id="photo-info">
                <div>
                  2016年6月2日
                </div>
              </div>
            </div>
            <div className="column is-6">
              <p id="comment-title" className="has-text-weight-bold is-size-5">
                Comments
              </p>
              <ul>
                <li className="comment-list flex flex-center">
                  <Link to="/user/woq">
                    <figure className="image is-32x32">
                      <img className="is-rounded" src={woq} alt="" />
                    </figure>
                  </Link>
                  <div className="right-body">
                    <p className="has-text-weight-bold is-size-6">
                      <Link to="/user/woq">
                        Mari Woq
                      </Link>
                    </p>
                    <p className="content">
                      Unbelievable!
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.isOpenPhotoMenuModal}
          onRequestClose={this.handleCloseModal}
          className="menu"
          style={{
            overlay: {
              zIndex: 100000,
              backgroundColor: 'rgba(0, 0, 0, 0.7)'
            },
            content: {
              width: '300px',
              maxWidth: '100%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateY(-50%)translateX(-50%)',
              backgroundColor: '#ffffff',
              borderRadius: '3px'
            }
          }}
        >
          <PhotoShareModal />
        </Modal>
      </div>
    )
  }
}