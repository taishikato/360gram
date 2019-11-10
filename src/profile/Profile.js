import React from 'react'
import './Profile.scss'

export default class Profile extends React.Component {
  render() {
    return (
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
      </div>
    )
  }
}