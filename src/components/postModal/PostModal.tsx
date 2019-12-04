import React from 'react'
import './PostModal.scss'
import UploadForm from './UploadForm'
import PostPhotoDetail from './PostPhotoDetail'
import { connect } from 'react-redux'
import { StateInterface } from '../../reducers'

class PostModal extends React.Component<PropsInterface> {

  blob: Blob | null = null

  state = {
    imageData: '',
    showPanorama: false
  }

  onFileChange = (e: any) => {
    this.setState({
      imageData: '',
      showPanorama: false
    })
    // blob形式に変換
    this.blob = new Blob(e.target.files, { type: 'image/jpeg' })
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        this.setState({
          imageData: e.target!.result,
          showPanorama: true
        })
      }
      reader.readAsDataURL(file)
    }
  }

  render() {
    const { imageData, showPanorama } = this.state
    const { loginUser, handleCloseModal } = this.props
    return (
      <div id="post-modal-wrapper">
        {showPanorama &&
          <PostPhotoDetail
            imageData={imageData}
            loginUser={loginUser}
            handleCloseModal={handleCloseModal}
          />
        }
        {!showPanorama &&
          <UploadForm onFileChange={this.onFileChange} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state: StateInterface) => {
  return {
    loginUser: state.loginUser
  }
}

interface PropsInterface {
  loginUser?: StateInterface['loginUser'],
  handleCloseModal: () => void
}

export default connect(
  mapStateToProps,
  null
)(PostModal)
