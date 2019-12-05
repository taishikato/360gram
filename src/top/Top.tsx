import React from 'react';
import { Link } from "react-router-dom"
import LoginModal from '../components/LoginModal'
import Modal from 'react-modal'
import './Top.scss'
import { Image, Transformation } from 'cloudinary-react'
import { cloudinary } from '../Const'
import { connect } from 'react-redux'
import { StateInterface } from '../reducers'
import firebase from '../plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()

class Top extends React.Component<PropsInterface> {
  state = {
    showModal: false,
    posts: []
  }

  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  componentDidMount = async () => {
    const postsData = await db
      .collection('posts')
      .orderBy('created', 'desc')
      .get()
    const posts = postsData.docs.map(doc => {
      return doc.data()
    })
    this.setState({ posts })

    console.log(posts)
  }

  render() {
    const { isLogin } = this.props
    return (
      <div>
        <div id="hero-bg" className="hero is-fullheight">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1 weight800">
                Share all angles<br />
                of your moment
              </h1>
              <h2 className="subtitle">
                Get inspired and share stunning<br />
                360 photos from all over the world.
              </h2>
              {!isLogin &&
                <div>
                  <a
                    id="sign-up-button-top"
                    className="button is-simple is-outlined is-rounded is-large"
                    onClick={this.handleOpenModal}
                  >
                    Sign Up
                  </a>
                </div>
              }
            </div>
          </div>
        </div>
        <div id="time-line">
          <div className="hero">
            <div className="hero-body has-text-centered">
              <div className="container">
                <p className="title is-1 weight900">
                  Our world
                </p>
              </div>
            </div>
          </div>

          <div className="columns section is-multiline">
            {this.state.posts.map((post: any, index: number) => {
              return <div className="column is-4" key={index}>
                <Link to={`/photo/${post.id}`}>
                  <Image cloudName={cloudinary.cloudName} publicId={post.publicId} >
                    <Transformation width="800" crop="pad" />
                  </Image>
                </Link>
              </div>
            })}
          </div>
        </div>
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
      </div>
    )
  }
}

const mapStateToProps = (state: StateInterface) => {
  return {
    isLogin: state.isLogin
  }
}

export default connect(
  mapStateToProps,
  null
)(Top)

interface PropsInterface {
  isLogin: StateInterface['isLogin']
}