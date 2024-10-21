import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../../context/auth/AuthContext'
import {
  getComments,
  handleNewComment
} from '../../../reducer/comment.reducer/comment.action'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import useScrollToRef from '../../../hooks/useScrollToRef'
import CardComment from '../../../components/card-comment/CardComment'
import './Comments.css'

const Comments = () => {
  const [newComment, setNewComment] = useState('')
  const location = useLocation()
  const [idPartner, setIdPartner] = useState(
    location.pathname.split('/')[2] || ''
  )
  const refComment = useRef(null)
  const { token, API_URL } = useContext(AuthContext)
  const {
    stateIsAuth: { isAuth },
    dispatchToast,
    dispatchLoader,
    stateComments: { partner, comments },
    dispatchComments
  } = useContext(ReducersContext)
  const { refCommentsSection } = useContext(ScrollRefContext)
  const scrollRef = useScrollToRef()

  useEffect(() => {
    setTimeout(() => {
      scrollRef(refCommentsSection)
    }, 500)
  }, [])

  const getComment = async () => {
    const data = await getComments(
      token,
      API_URL,
      idPartner,
      dispatchComments,
      dispatchToast,
      dispatchLoader
    )
  }

  useEffect(() => {
    if (partner._id !== idPartner) {
      getComment()
    }
  }, [])

  const handleNewComments = async () => {
    try {
      const { data } = await handleNewComment(
        API_URL,
        partner,
        token,
        newComment,
        dispatchLoader,
        dispatchToast
      )
      setNewComment('')
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: data.message, error: false }
      })
      dispatchComments({
        type: 'SET_COMMENTS',
        payload: [...comments, data.comment]
      })
      setTimeout(() => {
        scrollRef(refComment)
      }, 500)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  return (
    <section ref={refCommentsSection} className='comments__container'>
      <div className='comments__content fadeIn'>
        <div>
          <div className='comments__content-banner'>
            <img
              src={partner.banner}
              alt={`${partner.name} banner`}
              loading='lazy'
            />
          </div>
          <div className='comments__logo-absolute'>
            <img
              className='partner-avatar'
              src={partner.avatar}
              alt={`${partner.name} logo`}
              loading='lazy'
            />
          </div>
          <div className='comments__modal-details'>
            <p>{partner.name}</p>
            <p>Tlf: {partner.phone}</p>
            <p>{partner.address}</p>
            <p>{partner.city}</p>
          </div>
        </div>
      </div>
      {isAuth && (
        <div>
          <strong>
            <p>
              {comments.length
                ? 'Deja tu comentario:'
                : 'Serás el primero en dejar un comentario:'}
            </p>
          </strong>
          <div className='comment__reply-post-content'>
            <textarea
              className='comment__reply-input'
              type='text'
              placeholder='¿Te ha gustado nuestro servicio?'
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
              rows='1'
            />
            <button
              className='comment__reply-btn'
              onClick={handleNewComments}
              disabled={newComment.length > 0 ? false : true}
            >
              Comentar
            </button>
          </div>
        </div>
      )}
      <div ref={refComment} className='comments__content-view'>
        <h2>Comentarios</h2>
        <div>
          {comments.length ? (
            <>
              {comments
                ?.map((comment, index) => (
                  <CardComment key={index} comment={comment} />
                ))
                .reverse()}
            </>
          ) : (
            <p>Aún no hay comentarios a mostrar.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Comments
