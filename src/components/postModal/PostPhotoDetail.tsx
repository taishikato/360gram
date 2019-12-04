import React from 'react'
import { Pannellum } from 'pannellum-react'
import './PostPhotoDetail.scss'
import axios from 'axios'
import { cloudinary as cloudinaryConst } from '../../Const'
import firebase from '../../plugins/firebase'
import 'firebase/firestore'
import uuid from 'uuid/v4'
import { StateInterface } from '../../reducers'
import getUnixTime from '../../plugins/getUnixTime'
import { withRouter, RouteComponentProps } from 'react-router-dom';

const db = firebase.firestore()

const cloudinary = {
  uploadPreset: cloudinaryConst.uploadPreset,
  apiKey: cloudinaryConst.apiKey,
  cloudName: cloudinaryConst.cloudName
}

// const PostPhotoDetail: React.FC<PropsInterface> = (props) => {
class PostPhotoDetail extends React.Component<PropsInterface> {

  state = {
    title: ''
  }

  uploadImage = () => {
    const formData = new FormData()
    formData.append('file', this.props.imageData);
    formData.append('upload_preset', cloudinary.uploadPreset);
    formData.append('tags', '360gram');
    // For debug purpose only
    // Inspects the content of formData
    // for(var pair of formData.entries()) {
    //   console.log(pair[0]+', '+pair[1]);
    // }
  
    return axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinary.cloudName}/upload`,
      formData
    )
  }

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value }) 
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Upload image and get public_id
    const { data } = await this.uploadImage()
    // Save data on db
    const { loginUser } = this.props
    const id = uuid().split('-').join('')
    await db
      .collection('posts')
      .doc(id)
      .set({
        id,
        userId: loginUser!.uid,
        publicId: data['public_id'],
        created: getUnixTime(),
        title: this.state.title
      })
    this.props.handleCloseModal()
    this.props.history.push(`/photo/${id}`);
  }

  render() {
    const { title } = this.state
    return (
      <div className="columns">
        <div id="panorama-preview" className="column is-8">
          <Pannellum
            width="100%"
            height="500px"
            image={this.props.imageData}
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
        <form onSubmit={(event) => this.handleSubmit(event)} id="post-info" className="column whiteBg">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                required
                onChange={this.handleTitleChange}
                value={title}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea className="textarea"></textarea>
            </div>
          </div>

          <div className="field">
            <div className="control submit-button">
              {title !== '' ? (
                <input type="submit" className="button is-success has-text-weight-bold" value="Submit" />
              ) : (
                <button className="button is-success has-text-weight-bold" disabled>Submit</button>
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(PostPhotoDetail)

interface PropsInterface extends RouteComponentProps {
  imageData: string,
  loginUser?: StateInterface['loginUser'],
  handleCloseModal: () => void
}
