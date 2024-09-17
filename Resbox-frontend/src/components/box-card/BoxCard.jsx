import { getDate } from '../../helpers/date'
import './BoxCard.css'
import { getRandomBackgroundColor } from './helpers'

const BoxCard = ({ box }) => {
  console.log(box)
  return (
    <div
      className='boxcard__container fadeIn'
      style={{ backgroundColor: getRandomBackgroundColor() }}
    >
      <div className='boxcard__title'>
        <p className='boxcard__description'>Box: {box.box.name_box}</p>
      </div>
      <div className='boxcard__contain-information'>
        <div>
          <p>Incluye:</p>
          <p>{box.box.items_included}</p>
        </div>
        <div>
          <p>Extra:</p>
          <p>{box.box.bonus_items}</p>
        </div>
        <div>
          <p>Precio:</p>
          <p>{box.box.price}€</p>
        </div>
        {box.id_partner_consumed.length > 0 && (
          <div>
            <p>Usado en:</p>
            {box.id_partner_consumed?.map((partner, index) => (
              <p>{partner.name}</p>
            ))}
          </div>
        )}
        <div>
          <p>Fecha adquirido:</p>
          <p>{getDate(box.box.createdAt)}</p>
        </div>
      </div>
      <div className='boxcard__title-active'>
        <p className='boxcard__description-active'>
          Actvos: {box.remainingItems}
        </p>
      </div>
      <div className='boxcard__container-btn'>
        <div>
          <button className='button green'>Canjear</button>
          <button className='button yellow'>Añadir más</button>
        </div>
      </div>
    </div>
  )
}

export default BoxCard
