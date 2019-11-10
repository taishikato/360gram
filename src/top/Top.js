import React from 'react';
import myImage from "../img/360.JPG";
import topBg from "../img/top-gb.JPG"
import exampleImg from "../img/example.png"
import { Link } from "react-router-dom";
import './Top.scss'

export default class Top extends React.Component {
  render() {
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
              <div>
                <a id="sign-up-button-top" className="button is-simple is-outlined is-rounded is-large">
                  Sign Up
                </a>
              </div>
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