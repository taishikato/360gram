import React, { MouseEvent } from 'react'

const copyText = (text: string) => {
  const temp = document.createElement('div')
  temp.appendChild(document.createElement('pre')).textContent = text
  const s = temp.style
  s.position = 'fixed'
  s.left = '-100%'
  document.body.appendChild(temp)
  document.getSelection()!.selectAllChildren(temp)
  const result = document.execCommand('copy')
  document.body.removeChild(temp)
  // true なら実行できている falseなら失敗か対応していないか
  return result
}

const copy = (e: MouseEvent, text: string) => {
  e.preventDefault()
  copyText(text)
}

const PhotoShareModal: React.FC<PropsInterface>= (props) => {
  return <ul className="menu-list">
      <li>
        <a
          className="is-size-5"
          href={`https://twitter.com/share?url=${props.url}`}
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <li>
        <a
          className="is-size-5"
          href={`http://www.facebook.com/share.php?u=${props.url}`}
          target="_blank"
        >
          Facebook
        </a>
      </li>
      <li>
        <a className="is-size-5" onClick={(event) => copy(event, props.url)}>
          Copy Link
        </a>
      </li>
    </ul>
}

export default PhotoShareModal

interface PropsInterface {
  url: string
}