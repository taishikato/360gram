import React, { MouseEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import firebase from '../plugins/firebase'
import 'firebase/firestore'
import asyncForEach from '../plugins/asyncForEach'

const db = firebase.firestore()

const handleDislike = async (
  e: MouseEvent, postId: string,
  userId: string,
  setIsLiked: (isLiked: boolean) => void
): Promise<void> => {
  e.preventDefault()
  const likeData = await db
    .collection('likes')
    .where('userId', '==', userId)
    .get()
  await asyncForEach(likeData.docs, async doc => {
    await db
      .collection('likes')
      .doc(doc.id)
      .delete()
  })
  setIsLiked(false)
}

const Liked: React.FC<PropsInterface> = (props: PropsInterface) => {
    return <a className="photo-tools-item" onClick={(event) => handleDislike(event, props.postId, props.userId, props.setIsLiked)}>
    <span className="icon is-medium has-text-danger">
      <FontAwesomeIcon icon={faHeart} size="lg" />
    </span>
  </a>
}

export default Liked

interface PropsInterface {
  postId: string,
  userId: string,
  setIsLiked: (isLiked: boolean) => void
}