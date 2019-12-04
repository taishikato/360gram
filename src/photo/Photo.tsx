import React from 'react'
import Modal from 'react-modal'
import PhotoShareModal from '../components/PhotoShareModal'
import { Pannellum } from "pannellum-react"
import myImage from '../img/360.jpg'
import woq from "../img/woq.jpg"
import { Link, RouteComponentProps } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShareSquare } from '@fortawesome/free-regular-svg-icons'
import './Photo.scss'
import firebase from '../plugins/firebase'
import 'firebase/firestore'
import { cloudinary as cloudinaryConst } from '../Const'
import cloudinary from 'cloudinary-core'
import { isMobile } from 'react-device-detect'

const cl = new cloudinary.Cloudinary({cloud_name: cloudinaryConst.cloudName, secure: true});
const db = firebase.firestore()

export default class Profile extends React.Component<RouteComponentProps> {
  state: StateInterface = {
    isOpenPhotoMenuModal: false,
    post: {},
    photoUrl: '',
    user: {}
  }

  handleCloseModal = () => {
    this.setState({ isOpenPhotoMenuModal: false })
  }

  handleOpenPhotoShareModal = () => {
    this.setState({ isOpenPhotoMenuModal: true })
  }

  componentDidMount = async () => {
    const params = this.props.match.params as ParamsInterface
    const photoId = params.id
    const postData = await db.collection('posts').doc(photoId).get()
    const post = postData.data()
    console.log(post)
    let url: string
    if (isMobile) {
      url = cl.url(post!.publicId, { width: 2000, crop: 'scale'})
    } else {
      url = cl.url(post!.publicId)
    }
    this.setState({
      photoUrl: url,
      post
    })

    const userData = await db.collection('users').doc(post!.userId).get()
    this.setState({
      user: userData.data()
    })
    // console.log(userData.data())
  }

  render() {
    const { post, photoUrl, user } = this.state
    return (
      <div id="photo-page">
        <Pannellum
          width="100%"
          height="500px"
          image={photoUrl}
          pitch={10}
          yaw={180}
          hfov={110}
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
                    {post.title}
                  </p>
                  <p>
                    by <Link to="/user/takato">{user.name}</Link>
                  </p>
                </div>
                <figure className="image is-64x64">
                  <Link to="/user/takato">
                    <img className="is-rounded" src={user.picture} alt="" />
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

interface ParamsInterface {
  id: string
}

interface StateInterface {
  isOpenPhotoMenuModal: boolean,
  post: any,
  photoUrl: string,
  user: any
}