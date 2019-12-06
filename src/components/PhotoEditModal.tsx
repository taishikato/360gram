import React, { MouseEvent } from 'react'
import firebase from '../plugins/firebase'
import 'firebase/firestore'
import { RouteComponentProps } from 'react-router-dom'

const db = firebase.firestore()

const handleDelete = async (e: MouseEvent, postId: string, history: RouteComponentProps['history']) => {
  e.preventDefault()
  if(!window.confirm('Are you sure you delete this post?')) {
    console.log('canceled')
    return
  }
  await db
    .collection('posts')
    .doc(postId)
    .delete()
  history.push('/')
}

const PhotoEditModal: React.FC<PropsInterface> = (props) => {
  return <ul className="menu-list">
      <li>
        <a
          className="is-size-5"
          href={`https://twitter.com/share?url=${props.postId}`}
          target="_blank"
          onClick={(event) => handleDelete(event, props.postId, props.history)}
        >
          Delete
        </a>
      </li>
    </ul>
}

export default PhotoEditModal

interface PropsInterface {
  postId: string,
  history: RouteComponentProps['history']
}
