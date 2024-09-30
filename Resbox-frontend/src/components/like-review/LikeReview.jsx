import React, { useState } from 'react'
import like from '/images/like.png'
import heart from '/images/heart.png'
import rev_null from '/images/rev-null.png'
import rev_green from '/images/rev-green.png'

const LikeReview = () => {
  const [likes, setLikes] = useState(false)
  const [reviews, setReviews] = useState(false)
  return (
    <div className='modal-content-favorite'>
      {likes ? (
        <button onClick={() => setLikes(!likes)}>
          <img alt='Like' src={like} width='30' className='' title='Favorito' loading='lazy' />
        </button>
      ) : (
        <button onClick={() => setLikes(!likes)}>
          <img alt='Like' src={heart} width='30' title='Agregar a favorito' loading='lazy' />
        </button>
      )}
      {reviews ? (
        <button onClick={() => setReviews(!reviews)}>
          <img
            alt='Like'
            src={rev_green}
            width='40'
            className=''
            title='Garantizado'
          />
        </button>
      ) : (
        <button onClick={() => setReviews(!reviews)}>
          <img alt='Like' src={rev_null} width='40' title='¿Lo garantizas?' loading='lazy' />
        </button>
      )}
    </div>
  )
}

export default LikeReview
