import React from 'react'
import { Pannellum } from 'pannellum-react'
import './PostPhotoDetail.scss'

const PostPhotoDetail: React.FC<PropsInterface> = (props) => {
    return (
      <div className="columns">
        <div id="panorama-preview" className="column is-8">
          <Pannellum
            width="100%"
            height="500px"
            image={props.imageData}
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
        </div>
        <form id="post-info" className="column whiteBg">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" required />
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea className="textarea"></textarea>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control submit-button">
              <input type="submit" className="button is-success has-text-weight-bold" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    )
}

export default PostPhotoDetail

interface PropsInterface {
  imageData: string
}
