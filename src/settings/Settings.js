import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import './Settings.scss'

export default class Settings extends React.Component {
  render() {
    return (
      <section id="settings" className="section">
        <div className="columns">
          <div id="settings-column" className="column is-5 container">
            <p className="has-text-weight-bold">
              Profile
            </p>
            <div>
              <figure className="image is-128x128">
                <img src="https://bulma.io/images/placeholders/128x128.png" className="is-rounded" alt="ユーザーネーム" />
              </figure>
              <div className="file">
                <label className="file-label marginAuto">
                  <input className="file-input" type="file" name="resume" />
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
                  <textarea className="textarea" placeholder="e.g. Hello world"></textarea>
                </div>
              </div>
              <div className="field">
                <div className="control has-text-right">
                  <button class="button is-link is-rounded">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}