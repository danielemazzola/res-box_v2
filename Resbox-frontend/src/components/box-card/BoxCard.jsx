import { getDate } from '../../helpers/date'
import './BoxCard.css'

const BoxCard = ({ box }) => {
  console.log(box)
  const getRandomBackgroundColor = () => {
    const colors = [
      'var(--rb-bg-secondary)',
      'var(--rb-bg-tertiary)',
      'var(--rb-bg-card-img)',
      'var(--rb-bg-green)',
      'var(--rb-bg-options)',
      'var(--rb-bg-light)'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    return randomColor;
  };


  return (
    <div className='boxcard__container fadeIn' style={{backgroundColor: getRandomBackgroundColor()}}>
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
        <div>
          <p>Fecha adquirido:</p>
          <p>{getDate(box.box.createdAt)}</p>
        </div>
      </div>
        <p className='boxcard__description-date'>Última vez usado: {getDate(box.box.updatedAt)}</p>
    </div>
  )
}

export default BoxCard
