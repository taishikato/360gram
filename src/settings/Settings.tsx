import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import './Settings.scss'
import { connect } from 'react-redux'
import { loginUser } from '../actions'
import firebase from '../plugins/firebase'
import 'firebase/firestore'
import { UserInterface } from '../reducers'
import { Dispatch } from 'redux'

const db = firebase.firestore()

class Settings extends React.Component<PropsInteface> {

  blob: Blob | null = null
  downloadURL: string = ''

  state = {
    imageData: '',
    bio: '',
    isUpdating: false,
    blob: null
  }

  componentDidMount = () => {
    const { loginUser } = this.props
    this.setState({
      imageData: loginUser.picture,
      bio: loginUser.bio
    })
  }

  handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ bio: e.currentTarget.value })
  }

  update = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({ isUpdating: true })
    const { loginUser, updateUser } = this.props
    try {
      const updateItems: {
        picture?: string,
        bio? : string
      } = {}
      let picture = ''
      if (this.blob !== null) {
        picture = await this.upload(loginUser.uid)
        updateItems.picture = picture
      }

      updateItems.bio = this.state.bio

      await db
        .collection('users')
        .doc(loginUser.uid)
        .update(updateItems)
      if (this.blob !== null) {
        loginUser.picture = picture
      }
      updateUser(loginUser)
    } catch (err) {
      console.error(err)
    } finally {
      this.setState({ isUpdating: false })
    }
  }

  onFileChange = (e: any) => {
    console.table(e.target.files)
    this.setState({ imageData: '' })
    // const files = e.target.files
    // blob形式に変換
    this.blob = new Blob(e.target.files, { type: 'image/png' })
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        this.setState({ imageData: e.target!.result })
      }
      reader.readAsDataURL(file)
    }
  }

  upload = async (id: string) => {
    const updateDataConst: { picture?: '' } = {}
    // 画像処理
    if (this.blob !== null) {
      const storageRef = firebase.storage().ref()
      const uploadRef = storageRef.child(`users/${id}.png`)
      await uploadRef.put(this.blob)
      const url = await uploadRef.getDownloadURL()
      updateDataConst.picture = url
      this.downloadURL = url
      return url
    }
  }

  render() {
    const { imageData, isUpdating } = this.state
    return (
      <section id="settings" className="section">
        <div className="columns">
          <form
            id="settings-column"
            className="column is-5 container"
            onSubmit={this.update}
          >
            <p className="has-text-weight-bold">
              Profile
            </p>
            <div>
              <figure className="image is-128x128">
                <img src={imageData} className="is-rounded" alt="Profile Image" />
              </figure>
              <div className="file">
                <label className="file-label marginAuto">
                  <input className="file-input" type="file" name="resume" onChange={this.onFileChange} />
                  <span className="file-cta">
                    <span className="file-icon">
                      <FontAwesomeIcon icon={faUpload} />
                    </span>
                    <span className="file-label">
                      Choose a file…
                  </span>
                  </span>
                </label>
              </div>
              <div className="field">
                <label className="label">Bio</label>
                <div className="control">
                  <textarea value={this.state.bio} className="textarea" placeholder="e.g. Hello world" onChange={this.handleChange}></textarea>
                </div>
              </div>
              <div className="field">
                <div className="control has-text-right">
                  {isUpdating ?
                    (
                      <a className="button is-link is-rounded is-loading">Save changes</a>
                    ) : (
                      <input type="submit" className="button is-link is-rounded" value="Save changes" />
                    )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state: StateInterface) => {
  return {
    loginUser: state.loginUser,
  }
}

const mapDispacthToProps = (dispatch: Dispatch) => {
  return {
    updateUser: (loginUserData: UserInterface): void => {
      dispatch(loginUser(loginUserData))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(Settings)

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

interface PropsInteface {
  loginUser: UserInterface,
  updateUser: (loginUserData: UserInterface) => void
}

interface StateInterface {
  loginUser: UserInterface
}