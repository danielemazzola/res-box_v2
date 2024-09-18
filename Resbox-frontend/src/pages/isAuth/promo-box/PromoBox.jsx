import { useContext, useEffect, useMemo } from 'react'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import useScrollToRef from '../../../hooks/useScrollToRef'
import './PromoBox.css'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import BoxCard from '../../../components/box-card/BoxCard'
import { getRandomBackgroundColor } from '../../../components/box-card/helpers'

const PromoBox = () => {
  const backgroundColor = useMemo(() => getRandomBackgroundColor(), [])
  const { refBoxesSection } = useContext(ScrollRefContext)
  const {
    statePromoBoxes: { boxes },
    dispatchPromoBoxes,
    dispatchToast,
    dispatchLoader
  } = useContext(ReducersContext)
  const useScrolltoRef = useScrollToRef()
  useEffect(() => {
    setTimeout(() => {
      useScrolltoRef(refBoxesSection)
    }, 1000)
  }, [])
  useEffect(() => {
    const getAllPromoBox = async () => {
      try {
        dispatchLoader({ type: 'SET_LOAD_TRUE' })
        const response = await fetch(`${import.meta.env.VITE_URL_API}/box`)
        const data = await response.json()
        dispatchPromoBoxes({ type: 'SET_BOXES', payload: data.boxes })
      } catch (error) {
      } finally {
        setTimeout(() => {
          dispatchLoader({ type: 'SET_LOAD_FALSE' })
        }, 1500)
      }
    }
    getAllPromoBox()
  }, [])

  //console.log(boxes);
  
  return (
    <div ref={refBoxesSection} className='promobox__container'>
      <div className='promobox__cards-container fadeIn'>
        <div className='promobox__card'>
          <div>
            <h3>PROMO - BOX</h3>
            <p className='promobox__paragraph-rotate'>En un solo lugar</p>
          </div>
        </div>
      </div>
      {boxes.length > 0 ? (
        <>
          {boxes?.map((box, index) => (
            <div key={index} className='promobox__contain-card-box' style={{ backgroundColor }}>
            <div>
              <h1>{box.name_box}</h1>
              <p>{box.description}</p>
              <p>Incluye: {box.items_included}</p>
              <p>Extra: {box.bonus_items}</p>
              <p>Precio: {box.price}€</p>
              <p>Comprado: {box.items_acquired_by.length}</p>
              <p>{box.status.includes('active') ? 'Estado: Activo': 'Estado: Inactivo'}</p>

            </div>
            </div>
          ))}
        </>
      ) : (
        <p>No tienes boxes</p>
      )}
    </div>
  )
}

export default PromoBox
