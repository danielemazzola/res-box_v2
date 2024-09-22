import { useContext, useEffect, useMemo } from 'react'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { randomImage } from './helpers'
import './PromoBoxCard.css'
import { AuthContext } from '../../context/auth/AuthContext'
import { handleBuyBox } from '../../reducer/promo-box/promobox.action'
import confetti from 'canvas-confetti'

const PromoBoxCard = ({ box }) => {
  const image = useMemo(() => randomImage(), [])
  const {
    dispatchToast,
    dispatchAuth,
    dispatchLoader,
    dispatchPromoBoxes,
    stateIsAuth: { user }
  } = useContext(ReducersContext)
  const { API_URL, token } = useContext(AuthContext)

  const handleBuyBoxes = async () => {
    const { response, data } = await handleBuyBox(
      token,
      API_URL.user_add_more,
      box._id,
      'POST',
      dispatchLoader,
      dispatchToast
    )
    dispatchAuth({ type: 'SET_USER', payload: data.updatedUser })
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: data.message, error: false }
    })
    box.items_acquired_by.push(data.updatedUser)
    confetti({
      particleCount: 250,
      spread: 170,
      origin: { y: 1.3 }
    })
  }

  return (
    <div className='promobox__contain-card-box fadeIn'>
      <img
        src={`/images/coffe/${image}.webp`}
        className='promobox__images-banner'
      />
      <div className='promobox__details'>
        <div className='promobox__contain_title'>
          <h2 className='promobox__title'>{box.name_box}</h2>
          <p>{box.description}</p>
        </div>
        <div className='promobox__information'>
          <p>
            <strong>Incluye:</strong> {box.items_included}
          </p>
          <p>
            <strong>Extra:</strong> {box.bonus_items}
          </p>
          <p>
            <strong>Precio:</strong> {box.price}€
          </p>
          <p>
            <strong>Vendidos:</strong> {box.items_acquired_by.length}
          </p>
          <p>
            <strong>Estado:</strong>{' '}
            {box.status.includes('active') ? 'Activo' : 'Inactivo'}
          </p>
        </div>
        {Object.keys(user).length > 0 && (
          <div className='promobox__container-btn'>
            <button
              disabled={!box.status.includes('active')}
              className={`${
                box.status.includes('active') ? 'active' : 'disabled'
              }`}
              onClick={handleBuyBoxes}
            >
              Comprar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PromoBoxCard
