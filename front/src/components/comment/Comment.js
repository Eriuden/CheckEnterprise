import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addComment, getEnterprises } from '../../redux/actions/enterprises.action'
import { isEmpty } from '../../utils'
import EditDeleteComment from './EditDeleteComment'

export default function Comment({enterprise}) {
  const [text, setText] = useState("")
  const usersData = useSelector((state)=> state.usersReducer)
  const userData = useSelector((state))
  const dispatch = useDispatch()

  const handleComment = (e) => {
    e.preventDefault()

    if (text) {
      dispatch(addComment(enterprise._id, userData._id, text, userData.name))
        .then(()=> dispatch(getEnterprises()))
        .then(()=> setText(""))
    }
  }

  return (
    <div>
      {enterprise.comments.map((comment) => {
        return (
          <div key={comment._id}>
            <div>
              <img src={!isEmpty(usersData[0]) &&
              usersData.map((user) => {
                if (user._id === comment.commenterId) return user.picture
                else return null
              })
              .join("")
              }
              />
            </div>

            <div>
              <h3>{comment.commenterName}</h3>
            </div>
            <p>{comment.text}</p>
            <EditDeleteComment comment={comment} enterpriseId = {enterprise._id}/>
          </div>

          
        )
      }
      
      )}

      {
        userData._id && (
          <form action='' onSubmit={{ handleComment}}>
            <input type="text" name="text" onChange={(e)=> setText(e.target.value)}
            value={text} placeholder="laisser un commentaire"
            />
            <br/>
            <input type="submit"value="Envoyer"/>
          </form>
        )
      }
    </div>
  )
}
