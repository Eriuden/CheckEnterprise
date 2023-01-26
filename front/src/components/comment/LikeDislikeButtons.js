import React, {useContext, useEffect, useState} from 'react'
import { uidContext } from '../uidContext'
import Popup from "reactjs-popup"
import { likeEnterprise, unlikeEnterprise, dislikeEnterprise, undislikeEnterprise } from '../../redux/actions/enterprises.action'

export default function likeDislikeButtons({enterprise}) {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const uid = useContext(uidContext)

  const like = () => {
    dispatchEvent(likeEnterprise(enterprise._id, uid))
    setLiked(true)
  }

  const unlike = () => {
    dispatchEvent(unlikeEnterprise(enterprise._id, uid))
    setLiked(false)
  }

  const dislike = () => {
    dispatchEvent(dislikeEnterprise(enterprise._id, uid))
    setDisliked(true)
  }

  const undislike = () => {
    dispatchEvent(undislikeEnterprise(enterprise._id, uid))
    setDisliked(false)
  }

  useEffect(()=> {
    if (enterprise.likers.includes(uid)) setLiked(true)
    else if (enterprise.dislikers.includes(uid)) setDisliked(true)
    else setLiked(false) , setDisliked(false)
  }, [ uid, enterprise.likers, enterprise.dislikers, liked, disliked])

  return (
    <div>

      {
        uid === null && (
          <Popup trigger= {<img src="./img/icons/heart.svg" alt="like" />} position= {
            ['bottom center', 'bottom right', 'bottom left']} closeOnDocumentClick >
                <div>Vous devez être connecté pour liker un post</div>
          </Popup> 
         
        )
      }

      {
        uid && liked === false || disliked === false && (
          <>
            <img src="./img/icons/thumbUp.svg" onClick={like} alt="like"/>
            <img src="./img/icons/thumbDown.svg" onClick={dislike} alt="dislike"/>
          </>
         
        )
      }

      {
        uid && liked || disliked && (
          <>
            <img src="./img/icons/thumbUp.svg" onClick={unlike} alt="like"/>
            <img src="./img/icons/thumbDown.svg" onClick={undislike} alt="dislike"/>
          </>   
        )
      }

      <span>{enterprise.likers.length}</span>
      <span>{enterprise.dislikers.length}</span>
    </div>
  )
}
