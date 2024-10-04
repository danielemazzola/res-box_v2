import { useContext, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { handleBuyBox } from '../../reducer/promo-box/promobox.action'
import { randomImage } from './helpers'
import './PromoBoxCard.css'

const PromoBoxCard = ({ box }) => {
  const [explode, setExplode] = useState(false)
  const image = useMemo(() => randomImage(), [])
  const {
    dispatchToast,
    dispatchAuth,
    dispatchLoader,
    dispatchPromoBoxes,
    statePromoBoxes: { cart },
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

  const handleAddCart = (box) => {
    dispatchPromoBoxes({ type: 'SET_ADD_CART', payload: box })
    setExplode(true)
    setTimeout(() => setExplode(false), 400)
  }

  const handleRemoveItemCart = (box) => {
    dispatchPromoBoxes({ type: 'SET_REMOVE_CART', payload: box })
  }

  const cartItem = cart?.find(
    (item) => item._id.toString() === box._id.toString()
  )

  return (
    <div className='promobox__contain-card-box fadeIn'>
      <img
        src={`/images/coffe/${image}.webp`}
        className='promobox__images-banner'
        alt='banner'
        loading='lazy'
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
            <strong>P/U:</strong>{' '}
            {box.price / (box.items_included + box.bonus_items)}€
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
            {cartItem ? (
              <div
                key={cartItem._id}
                className='promobox__container-btn-control fadeIn'
              >
                <button className='' onClick={() => handleRemoveItemCart(box)}>
                  -
                </button>
                🛒
                <p
                  className={`promobox__quantity-cart ${
                    explode ? 'explode' : ''
                  }`}
                >
                  {cartItem.quantity}
                </p>
                <button className='' onClick={() => handleAddCart(box)}>
                  +
                </button>
              </div>
            ) : (
              <button
                disabled={!box.status.includes('active')}
                className={`cart-shop fadeIn ${
                  box.status.includes('active') ? 'active' : 'disabled'
                }`}
                onClick={() => handleAddCart(box)}
              >
                +🛒
              </button>
            )}
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
