import React, { MouseEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import firebase from '../plugins/firebase'
import 'firebase/firestore'
import getUnixTime from '../plugins/getUnixTime'

const db = firebase.firestore()

const handleLike = async (
  e: MouseEvent,
  postId: string,
  userId: string,
  setIsLiked: (isLiked: boolean) => void,
  addLikeCount: () => void
): Promise<void> => {
  e.preventDefault()
  if (userId === undefined) {
    // no login user
    await db
      .collection('likes')
      .add({
        postId,
        created: getUnixTime()
      })
  } else {
    await db
      .collection('likes')
      .add({
        postId,
        userId,
        created: getUnixTime()
      })
  }
  setIsLiked(true)
  addLikeCount()
}

const Like: React.FC<PropsInterface> = (props: PropsInterface) => {
    return <a className="photo-tools-item" onClick={(event) => handleLike(event, props.postId, props.userId, props.setIsLiked, props.addLikeCount)}>
    <span className="icon is-medium">
      <FontAwesomeIcon icon={faHeart} size="lg" />
    </span>
  </a>
}

export default Like

interface PropsInterface {
  postId: string,
  userId: string,
  setIsLiked: (isLiked: boolean) => void,
  addLikeCount: () => void
}