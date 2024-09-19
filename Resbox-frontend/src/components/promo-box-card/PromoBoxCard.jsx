import { useContext, useMemo } from 'react'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { randomImage } from './helpers'
import './PromoBoxCard.css'
import { AuthContext } from '../../context/auth/AuthContext'
import { handleBuyBox } from '../../reducer/promo-box/promobox.action'

const PromoBoxCard = ({ box }) => {
  const image = useMemo(() => randomImage(), [])
  const { dispatchToast, dispatchAuth, dispatchLoader } =
    useContext(ReducersContext)
  const { API_URL } = useContext(AuthContext)

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
        <div className='promobox__container-btn'>
          <button
            disabled={!box.status.includes('active')}
            className={`${
              box.status.includes('active') ? 'active' : 'disabled'
            }`}
            onClick={() =>
              handleBuyBox(
                API_URL,
                box,
                dispatchLoader,
                dispatchAuth,
                dispatchToast
              )
            }
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PromoBoxCard
