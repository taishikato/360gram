import React from 'react'
import './PostModal.scss'
import UploadForm from './UploadForm'
import PostPhotoDetail from './PostPhotoDetail'
import { connect } from 'react-redux'
import { StateInterface } from '../../reducers'
import { isMobile } from 'react-device-detect'
import jimp from 'jimp'
import { base64StringToBlob } from 'blob-util'

class PostModal extends React.Component<PropsInterface> {

  blob: Blob | null = null

  state = {
    imageData: '',
    previewData: '',
    showPanorama: false,
    isLoadingImage: false
  }

  onFileChange = (e: any) => {
    this.setState({
      imageData: '',
      showPanorama: false,
      isLoadingImage: true
    })
    // blob形式に変換
    this.blob = new Blob(e.target.files, { type: 'image/jpeg' })
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = async (e) => {
        const img: any = new Image();
        img.src = reader.result
        const imgObj: any = { img }
        let previewData = e.target!.result
        // console.log(imgObj.img)
        if (isMobile) {
          console.log('iphone')
          // リサイズ
          const res = await jimp.read(e.target!.result as any)
          const resized = await res.resize(3000, jimp.AUTO)
          previewData = await resized.getBase64Async('image/jpeg')
        }
        this.setState({
          imageData: e.target!.result,
          previewData,
          showPanorama: true,
          isLoadingImage: false
        })
      }
      reader.readAsDataURL(file)
    }
  }

  render() {
    const { imageData, previewData, showPanorama, isLoadingImage } = this.state
    const { loginUser, handleCloseModal } = this.props
    return (
      <div id="post-modal-wrapper">
        {isLoadingImage &&
          <span style={{position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%)translateX(-50%)'}}>
            Loading…
          </span>
        }
        {showPanorama && !isLoadingImage &&
          <PostPhotoDetail
            imageData={imageData}
            previewData={previewData}
            loginUser={loginUser}
            handleCloseModal={handleCloseModal}
          />
        }
        {!showPanorama && !isLoadingImage &&
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
