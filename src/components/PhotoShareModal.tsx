import React from "react"

export default class PhotoShareModal extends React.Component {
  render() {
    return (
      <ul className="menu-list">
        <li>
          <a className="is-size-5">
            Twitter
          </a>
        </li>
        <li>
          <a className="is-size-5">
            Facebook
          </a>
        </li>
        <li>
          <a className="is-size-5">
            Copy Link
          </a>
        </li>
      </ul>
    )
  }
}