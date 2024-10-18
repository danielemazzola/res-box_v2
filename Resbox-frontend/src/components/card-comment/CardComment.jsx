import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth/AuthContext'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import './CardComment.css'
import { getDate } from '../../helpers/date'
import CardReplies from './CardReplies'

const CardComment = ({ comment }) => {
  const [reply, setReply] = useState('')
  const { token, API_URL } = useContext(AuthContext)
  const [viewReplies, setViewReplies] = useState(false)
  const {
    dispatchToast,
    dispatchLoader,
    dispatchComments,
    stateComments: { comments }
  } = useContext(ReducersContext)

  const handleReply = async (comment, reply) => {
    try {
      dispatchLoader({ type: 'SET_LOAD_TRUE' })
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/${API_URL.reply_comment}/${
          comment._id
        }`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: reply })
        }
      )
      const data = await response.json()
      if (response.status !== 201) {
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: data.message, error: true }
        })
        return
      }
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: data.message, error: false }
      })
      const updatedComments = comments.map((c) =>
        c._id === data.comment._id ? { ...c, replies: data.comment.replies } : c
      )
      dispatchComments({
        type: 'SET_COMMENTS',
        payload: updatedComments
      })
      setReply('')
    } catch (error) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: error.message || 'Error desconocido', error: true }
      })
    } finally {
      dispatchLoader({ type: 'SET_LOAD_FALSE' })
    }
  }

  return (
    <div className='comment__container-comments'>
      <p>
        <strong>Públicado por</strong>
      </p>
      <div className='comment__content-info-user'>
        <img src={comment.idUser.avatar} alt={comment.idUser.name} width='30' />
        <p>{comment.idUser.name}</p>
      </div>
      <div className='comment__content-msg'>
        <p>{comment.content}</p>
      </div>
      <i>
        <strong>Fecha públicación</strong> {getDate(comment.createdAt)}
      </i>
      <div className='comment__reply-post-content'>
        <textarea
          className='comment__reply-input'
          type='text'
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder='Responder...'
          rows='1'
        />
        <button
          disabled={reply.length > 0 ? false : true}
          className='comment__reply-btn'
          onClick={() => handleReply(comment, reply)}
        >
          Responder
        </button>
      </div>
      {comment.replies.length>0 && (
        <div className='comment__replies'>
          <i
            className='comment__view-replies'
            onClick={() => setViewReplies(!viewReplies)}
          >
            {viewReplies ? 'Cerrar' : 'Respuestas'} ({comment.replies.length})
          </i>
          {viewReplies && (
            <>
              {comment?.replies
                ?.map((rep) => <CardReplies key={rep._id} reply={rep} />)
                .reverse()}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CardComment
