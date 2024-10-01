import React, { useContext, useState } from 'react'
import like from '/images/like.png'
import heart from '/images/heart.png'
import rev_null from '/images/rev-null.png'
import rev_green from '/images/rev-green.png'
import { AuthContext } from '../../context/auth/AuthContext'
import { ReducersContext } from '../../context/reducers/ReducersContext'

const LikeReview = ({ idPartner }) => {
  const [reviews, setReviews] = useState(false)
  const { token } = useContext(AuthContext)
  const {
    stateIsAuth: { user },
    dispatchAuth
  } = useContext(ReducersContext)

  //! PENDIENTE ACTUALIZAR AL PARTNER

  const handleAddToFavorite = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/user/add-favorite/${idPartner}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json()
      if (data.favorites) {
        dispatchAuth({
          type: 'SET_USER',
          payload: { ...user, favorites: data.favorites.favorites }
        })
      } else {
        const updatedFavorites = user.favorites.filter(
          (fav) => fav !== idPartner
        )
        dispatchAuth({
          type: 'SET_USER',
          payload: { ...user, favorites: updatedFavorites }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const existFavorite = user?.favorites?.some((exist) => exist === idPartner)

  return (
    <div className='modal-content-favorite'>
      {existFavorite ? (
        <button onClick={handleAddToFavorite}>
          <img
            alt='Like'
            src={like}
            width='30'
            className=''
            title='Favorito'
            loading='lazy'
          />
        </button>
      ) : (
        <button onClick={handleAddToFavorite}>
          <img
            alt='Like'
            src={heart}
            width='30'
            title='Agregar a favorito'
            loading='lazy'
          />
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
          <img
            alt='Like'
            src={rev_null}
            width='40'
            title='¿Lo garantizas?'
            loading='lazy'
          />
        </button>
      )}
    </div>
  )
}

export default LikeReview
