import React, { MouseEvent } from 'react'
import firebase from '../plugins/firebase'
import 'firebase/firestore'
import { RouteComponentProps } from 'react-router-dom'

const db = firebase.firestore()

const handleOpenEditModal = (e: MouseEvent, handleOpenEditModal: () => void) => {
  e.preventDefault()
  handleOpenEditModal()
}

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
          target="_blank"
          onClick={(event) => handleOpenEditModal(event, props.handleOpenEditModal)}
        >
          Edit
        </a>
      </li>
      <li>
        <a
          className="is-size-5"
          target="_blank"
          onClick={(event) => handleDelete(
            event,
            props.postId,
            props.history
          )}
        >
          Delete
        </a>
      </li>
    </ul>
}

export default PhotoEditModal

interface PropsInterface {
  postId: string,
  history: RouteComponentProps['history'],
  handleOpenEditModal: () => void
}
