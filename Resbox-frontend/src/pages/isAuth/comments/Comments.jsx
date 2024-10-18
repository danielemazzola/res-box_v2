import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../../context/auth/AuthContext'
import './Comments.css'
import { getComments } from '../../../reducer/comment.reducer/comment.action'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import Like from '../../../components/like/Like'
import { getDate } from '../../../helpers/date'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import useScrollToRef from '../../../hooks/useScrollToRef'
import CardComment from '../../../components/card-comment/CardComment'
const Comments = () => {
  const location = useLocation()
  const [idPartner, setIdPartner] = useState(
    location.pathname.split('/')[2] || ''
  )
  const { token, API_URL } = useContext(AuthContext)
  const {
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
      <div className='comments__content-view'>
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
            <p>No hay comntarios</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Comments
