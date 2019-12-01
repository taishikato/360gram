import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const UploadForm: React.FC<PropsInterface> = (props) => {
  return <div className="file" id="post-button">
    <label className="file-label">
      <input className="file-input" type="file" name="resume" onChange={props.onFileChange} />
      <span className="file-cta">
        <span className="file-icon">
          <FontAwesomeIcon icon={faUpload} />
        </span>
        <span className="file-label">
          Choose a photo…
        </span>
      </span>
    </label>
  </div>
}

export default UploadForm

interface PropsInterface {
    onFileChange: (e: any) => void
}
