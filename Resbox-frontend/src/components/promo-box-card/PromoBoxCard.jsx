import confetti from 'canvas-confetti'
import { randomImage } from './helpers'
import './PromoBoxCard.css'
import { useContext } from 'react'
import { ReducersContext } from '../../context/reducers/ReducersContext'

const PromoBoxCard = ({ box }) => {
  const image = randomImage()
  const { dispatchToast, dispatchAuth, dispatchLoader } =
    useContext(ReducersContext)

  const handleBuyBox = async (buyBox) => {
    const token = localStorage.getItem('SECURE_CODE_RESBOX')
    try {
      dispatchLoader({ type: 'SET_LOAD_TRUE' })
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/box/buy-box/${buyBox._id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()
      console.log(response)
      console.log(data)
      if (response.status !== 201) {
      } else {
        confetti({
          particleCount: 250,
          spread: 170,
          origin: { y: 1.3 }
        })
        dispatchAuth({ type: 'SET_USER', payload: data.updatedUser })
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: data.message, error: false }
        })
      }
    } catch (error) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: error.message, error: true }
      })
    } finally {
      dispatchLoader({ type: 'SET_LOAD_FALSE' })
    }
  }

  return (
    <div className='promobox__contain-card-box'>
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
        <div className='promobox__container-btn'>
          <button
            disabled={!box.status.includes('active')}
            className={`${
              box.status.includes('active') ? 'active' : 'disabled'
            }`}
            onClick={() => handleBuyBox(box)}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PromoBoxCard
