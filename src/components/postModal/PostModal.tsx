import React from 'react'
import './PostModal.scss'
import UploadForm from './UploadForm'
import PostPhotoDetail from './PostPhotoDetail'

class PostModal extends React.Component {

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
    return (
      <div id="post-modal-wrapper">
        {showPanorama &&
          <PostPhotoDetail imageData={imageData} />
        }
        {!showPanorama &&
          <UploadForm onFileChange={this.onFileChange} />
        }
      </div>
    )
  }
}

export default PostModal
