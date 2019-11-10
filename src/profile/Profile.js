import React from 'react'
import './Profile.scss'
import { Link } from "react-router-dom"
import exampleImg from "../img/example.png"

export default class Profile extends React.Component {
  render() {
    return (
      <div className="whiteBg">
        <div className="container">
          <div className="hero">
            <div className="hero-body has-text-centered">
              <div className="container">
                <figure id="profile-img" className="image is-96x96">
                  <img className="is-rounded" src="https://bulma.io/images/placeholders/96x96.png" alt="" />
                </figure>
                <h1 className="title">
                  Taishi Kato
                </h1>
                <h2 className="subtitle">
                  Hi I am a traveler
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