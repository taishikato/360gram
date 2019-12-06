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
import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert'
import { RouteComponentProps } from 'react-router-dom'

const db = firebase.firestore()

class Settings extends React.Component<PropsInteface> {

  blob: Blob | null = null
  downloadURL: string = ''
  showSuccess: () => void = () => {}

  state = {
    imageData: '',
    bio: '',
    username: '',
    isUpdating: false,
    blob: null
  }

  componentDidMount = () => {
    const { isLogin, loginUser } = this.props
    if (!isLogin) {
      this.props.history.push('/404');
    }
    this.setState({
      imageData: loginUser.picture,
      bio: loginUser.bio,
      username: loginUser.username
    })
  }

  Container = wrapComponent(({ createSnackbar }: { createSnackbar: any }) => {
    this.showSuccess = () => {
      console.log('showSnackbar')
      createSnackbar({
        message: 'Success to save',
        theme: 'success',
      });
    }

    return (
      <div></div>
    )
  })

  handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ bio: e.currentTarget.value })
  }

  handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value })
  }

  update = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({ isUpdating: true })
    const { loginUser, updateUser } = this.props
    try {
      const updateItems: {
        picture?: string,
        bio? : string,
        username?: string
      } = {}
      let picture = ''
      if (this.blob !== null) {
        picture = await this.upload(loginUser.uid)
        updateItems.picture = picture
      }

      updateItems.bio = this.state.bio

      // check username
      const usernameUserData = await db
        .collection('users')
        .where('username', '==', this.state.username)
        .get()
      if (usernameUserData.size > 0) {
        const user = usernameUserData.docs[0].data()
        if (user.uid !== loginUser.uid) {
          console.warn('This username is already taken')
          return
        }
      }

      updateItems.username = this.state.username

      await db
        .collection('users')
        .doc(loginUser.uid)
        .update(updateItems)
      if (this.blob !== null) {
        loginUser.picture = picture
      }
      loginUser.username = updateItems.username
      this.showSuccess()
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
        <SnackbarProvider position="top">
          <this.Container />
        </SnackbarProvider>
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
                <label className="label">Username</label>
                <div className="control">
                  <input type="text" className="input" value={this.state.username} onChange={this.handleUsernameChange} />
                </div>
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
    isLogin: state.isLogin,
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

interface PropsInteface extends RouteComponentProps {
  loginUser: UserInterface,
  isLogin: boolean,
  updateUser: (loginUserData: UserInterface) => void
}

interface StateInterface {
  loginUser: UserInterface,
  isLogin: boolean
}