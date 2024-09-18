import { useMemo } from 'react'
import confetti from 'canvas-confetti'
import { getRandomBackgroundColor } from '../box-card/helpers'
import './PromoBoxCard.css'
import { randomImage } from './helpers'

const PromoBoxCard = ({ box }) => {
  const image = randomImage()
  /* 
  confetti({
      particleCount: 250,
      spread: 170,
      origin: { y: 1.3 }
    }) */
  const backgroundColor = useMemo(() => getRandomBackgroundColor(), [])
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
      </div>
    </div>
  )
}

export default PromoBoxCard
