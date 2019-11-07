import React from 'react';
import { Pannellum } from "pannellum-react";
import myImage from "./img/360.JPG";
import exampleImg from "./img/example.png"

export default class Top extends React.Component {
  render() {
    return (
      <div>
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
        <div id="time-line">
          <div className="hero">
            <div className="hero-body has-text-centered">
              <div className="container">
                <p className="title is-1 weight900">
                  Great 360 Pictures
                </p>
              </div>
            </div>
          </div>

          <div className="columns section is-multiline">
            <div className="column is-4">
              <img src={exampleImg} />
            </div>
            <div className="column is-4">
              <img src={exampleImg} />
            </div>
            <div className="column is-4">
              <img src={exampleImg} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}