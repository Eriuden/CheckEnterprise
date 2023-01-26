import React, {useState,useEffect, useContext} from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment, editComment } from '../../redux/actions/enterprises.action'
import { uidContext } from '../uidContext'


export default function EditDeleteComment(comment, enterpriseId) {
  const [isAuthor, setIsAuthor] = useState(false)
  const [edit, setEdit] = useState(false)
  const [text, setText] = useState(false)
  const uid = useContext(uidContext)
  const dispatch = useDispatch()

  const handleEdit = (e) => {
    e.preventDefault()

    if (text) {
      dispatch(editComment(postId, comment._id, text))
      setText("")
      setEdit(false)
    }
  }

  const handleDelete = () => {
    dispatch(deleteComment(enterpriseId, comment._id))
  }

  useEffect(()=> {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true)
      }
    }
    checkAuthor()
  }, [uid, comment.commenterId])

  return (
    <div>
      {isAuthor && edit && (
        <span onClick={ setEdit(!edit)}>
          <img src='./img/icons/edit.svg' alt='edit' />
        </span>
      )}
      {isAuthor && edit && (
        <form action='' onSubmit={handleEdit} >
          <label htmlFor='text' onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br/>
          <input type="text" name='text' onChange={(e)=> setText(e.target.value)}
          defaultValue={comment.text}
          />
          <br/>
          <div>
            <span onClick={()=> {
              if (window.confirm("voulez vous supprimer ce commentaire ?")) {
                handleDelete()
              }
            }}>
              <img src='img/icons/trash.svg' alt='' />
            </span>
          </div>
          <input type="submit" value="valider les modifications" />
        </form>
      )}
    </div>
  )
}
