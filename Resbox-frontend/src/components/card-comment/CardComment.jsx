import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/auth/AuthContext'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import './CardComment.css'
import { getDate } from '../../helpers/date'
import CardReplies from './CardReplies'
import useScrollToRef from '../../hooks/useScrollToRef'

const CardComment = ({ comment }) => {
  const [reply, setReply] = useState('')
  const [repliesVisible, setRepliesVisible] = useState({
    replies: [],
    stateView: false
  })
  const useScroll = useScrollToRef()
  const { token, API_URL } = useContext(AuthContext)
  const {
    stateIsAuth: { isAuth },
    dispatchToast,
    dispatchLoader,
    dispatchComments,
    stateComments: { comments }
  } = useContext(ReducersContext)
  const refReply = useRef(null)

  useEffect(() => {
    if (repliesVisible.replies.length > 0) {
      setTimeout(() => {
        useScroll(refReply)
      }, 500)
    } else return
  }, [repliesVisible])

  const handleReply = async (comment, reply) => {
    try {
      dispatchLoader({ type: 'SET_LOAD_TRUE' })
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/${API_URL.new_reply}/${comment._id}`,
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
      setRepliesVisible((prev) => ({
        ...prev,
        stateView: true,
        replies: [...repliesVisible.replies, data.reply]
      }))
      setReply('')
    } catch (error) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: error.message, error: true }
      })
    } finally {
      dispatchLoader({ type: 'SET_LOAD_FALSE' })
    }
  }

  const handleGetReplies = async (idComment) => {
    if (repliesVisible.replies.length > 1) {
      setRepliesVisible((prev) => ({
        ...prev,
        stateView: !repliesVisible.stateView
      }))
      return
    }
    try {
      dispatchLoader({ type: 'SET_LOAD_TRUE' })
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/comment/get-replies/${idComment}`
      )
      const data = await response.json()
      if (response.status !== 200) {
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: {
            msg: data.message,
            error: true
          }
        })
        return
      }
      setRepliesVisible((prev) => ({
        ...prev,
        replies: data,
        stateView: true
      }))
    } catch (error) {
    } finally {
      setTimeout(() => {
        dispatchLoader({ type: 'SET_LOAD_FALSE' })
      }, 300)
    }
  }

  return (
    <div ref={refReply} className='comment__container-comments'>
      <p>
        <strong>Publicado por</strong>
      </p>
      <div className='comment__content-info-user'>
        <img src={comment.idUser.avatar} alt={comment.idUser.name} width='30' />
        <p>{comment.idUser.name}</p>
      </div>
      <div className='comment__content-msg'>
        <p>{comment.content}</p>
      </div>
      <i>
        <strong>Fecha publicación</strong> {getDate(comment.createdAt)}
      </i>
      {isAuth && (
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
      )}
      {comment.replies > 0 && (
        <div className='comment__replies'>
          <i
            className='comment__view-replies'
            onClick={() => handleGetReplies(comment._id)}
          >
            Ver comentarios ({comment.replies})
          </i>
          {repliesVisible.stateView && (
            <>
              {repliesVisible.replies
                ?.map((reply) => <CardReplies key={reply._id} reply={reply} />)
                .reverse()}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CardComment
