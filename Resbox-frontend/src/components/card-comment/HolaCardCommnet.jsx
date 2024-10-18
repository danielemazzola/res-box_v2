import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth/AuthContext'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import './cardCommnet.css'
import { getDate } from '../../helpers/date'

const CardCommnet = ({ comment }) => {
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
      dispatchLoader({ type: 'SET:LOAD_TRUE' })
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
      dispatchLoader({ type: 'SET:LOAD_FALSE' })
    }
  }

  console.log(comment)

  return (
    <div className='comment__container-comments'>
      <p>
        <strong>Públicado por</strong> {comment.idUser.name}
      </p>
      <p>{comment.content}</p>
      <i>
        <strong>Fecha públicación</strong> {getDate(comment.createdAt)}
      </i>
      <div className='comment__reply-post-content'>
        <input
          className='comment__reply-input'
          type='text'
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder='Escribe aquí...'
        />
        <button
          disabled={reply.length > 0 ? false : true}
          type='submit'
          className='comment__reply-btn'
          onClick={() => handleReply(comment, reply)}
        >
          Enviar
        </button>
      </div>
      <div className='comment__replies'>
        <i
          className='comment__view-replies'
          onClick={() => setViewReplies(!viewReplies)}
        >
          {viewReplies ? 'Cerrar' : 'Respuestas'}
        </i>
        {viewReplies && (
          <>
            {comment?.replies
              ?.map((r) => (
                <div key={r._id} className='comment__content'>
                  <div className='comment__container-info-user'>
                    <div>
                      <img src={r.idUser.avatar} alt={r.idUser.name} />
                      <i>{r.idUser.name}</i>
                    </div>
                    <p>{getDate(r.createdAt)}</p>
                  </div>
                  <div>
                    <p>{r.content}</p>
                  </div>
                </div>
              ))
              .reverse()}
          </>
        )}
      </div>
    </div>
  )
}

export default CardCommnet
