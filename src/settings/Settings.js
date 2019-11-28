import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import './Settings.scss'
import { connect } from 'react-redux'
import { loginUser } from '../actions'
import firebase from '../plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()

class Settings extends React.Component {

  constructor(props) {
    super(props)
    this.blob = null
  }

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

  handleChange = (e) => {
    this.setState({ bio: e.target.value })
  }

  update = async (e) => {
    e.preventDefault()
    this.setState({ isUpdating: true })
    const { loginUser, updateUser } = this.props
    try {
      const updateItems = {}
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
      this.setState({ isUpdating: false })
      // const userRef = firestore
      //   .collection('publicUsers')
      //   .doc(this.$store.getters.getUserInfo.uid)
      // const userSecretRef = firestore
      //   .collection('secretUsers')
      //   .doc(this.$store.getters.getUserInfo.uid)
      // await Promise.all([
      //   updateDoc(userRef, this.userSettings),
      //   updateDoc(userSecretRef, this.userSecretSettings)
      // ])
      // this.$snackbar.open({
      //   message: 'Successfuly saved',
      //   type: 'is-success',
      //   position: 'is-top',
      //   duration: 3000
      // })
    } catch (err) {
      console.error(err)
      // this.$snackbar.open({
      //   message: 'Something went wrong...Please try again',
      //   type: 'is-danger',
      //   position: 'is-top',
      //   duration: 4000
      // })
    } finally {
      this.isLoading = false
    }
  }

  onFileChange = (e) => {
    console.table(e.target.files)
    this.imageData = ''
    const files = e.target.files
    // blob形式に変換
    this.blob = new Blob(files, { type: 'image/png' })
    if (files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        this.setState({ imageData: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  upload = async (id) => {
    const updateDataConst = {}
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
                  {/* <input type="submit" className={this.state.isUpdating ? 'button is-link is-rounded is-loading' : 'button is-link is-rounded'} value="Save changes" /> */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginUser: state.loginUser,
  }
}

const mapDispacthToProps = dispatch => {
  return {
    updateUser: (loginUserData) => {
      dispatch(loginUser(loginUserData))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(Settings)