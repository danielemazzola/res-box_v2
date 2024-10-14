import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth/AuthContext'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import HeartLoader from '../loader/HeartLoader'
import './Like.css'
import like from '/images/like.png'
import heart from '/images/heart.png'
import { fetchLike } from '../../services/fetch-like/fetchLike'

const Like = ({ idPartner }) => {
  const { token, API_URL, setStateBoxCard } = useContext(AuthContext)
  const {
    stateIsAuth: { user },
    dispatchAuth,
    statePartners: { partners },
    dispatchPartners,
    dispatchToast
  } = useContext(ReducersContext)

  const [loadLike, setLoadLike] = useState(false)

  const handleAddToFavorite = async () => {
    try {
      setLoadLike(true)
      const urlApi = `${import.meta.env.VITE_URL_API}/${
        API_URL.like
      }/${idPartner}`
      const { response, data } = await fetchLike(urlApi, token)

      if (response.status !== 201) {
        const error = new Error('Hubo un problema en su solicitud.')
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: {
            msg: error,
            error: true
          }
        })
        return
      }
      dispatchAuth({
        type: 'SET_USER',
        payload: data.favorites
      })

      setStateBoxCard((prevState) => ({
        ...prevState,
        infoPartner: {
          ...prevState.infoPartner,
          favorite: data.updatePartner.favorite
        }
      }))

      let updatePartner = partners?.find(
        (partner) => partner._id.toString() === idPartner.toString()
      )

      if (updatePartner) {
        const updatePartner = data.updatePartner
        const updatedPartners = partners.map((partner) =>
          partner._id.toString() === updatePartner._id.toString()
            ? {
                ...partner,
                ...updatePartner
              }
            : partner
        )
        dispatchPartners({
          type: 'SET_PARTNERS',
          payload: updatedPartners
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setLoadLike(false)
      }, 500)
    }
  }

  const existFavorite = user?.favorites?.some((exist) => exist === idPartner)

  return (
    <div className='like-content-favorite'>
      {existFavorite ? (
        <button onClick={handleAddToFavorite}>
          <img
            alt='Like'
            src={like}
            width='20'
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
            width='20'
            title='Agregar a favorito'
            loading='lazy'
          />
        </button>
      )}
    </div>
  )
}

export default Like
