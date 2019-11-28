import React from 'react'
import './Profile.scss'
import { Link } from "react-router-dom"
import exampleImg from "../img/example.png"
import firebase from '../plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()

export default class Profile extends React.Component {

  state = {
    user: {}
  }

  componentDidMount = async () => {
    const userData = await db
      .collection('users')
      .where('username', '==', this.props.match.params.username)
      .get()
    this.setState({
      user: userData.docs[0].data()
    })
  }

  render() {
    const { user } = this.state
    return (
      <div className="whiteBg">
        <div className="container">
          <div className="hero">
            <div className="hero-body has-text-centered">
              <div className="container">
                <figure id="profile-img" className="image is-96x96">
                  <img className="is-rounded" src={user.picture} alt="" />
                </figure>
                <h1 className="title">
                  {user.name}
                </h1>
                <h2 className="subtitle">
                  {user.bio || 'No bio yet'}
                </h2>
              </div>
            </div>
          </div>
          <div className="is-devider"></div>
          <div className="columns section is-multiline">
            <div className="column is-4">
              <Link to="/photo/tennis-girl">
                <img src={exampleImg} />
              </Link>
            </div>
            <div className="column is-4">
              <Link to="/photo/tennis-girl">
                <img src={exampleImg} />
              </Link>
            </div>
            <div className="column is-4">
              <Link to="/photo/tennis-girl">
                <img src={exampleImg} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}