import { useContext, useEffect } from 'react'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import useScrollToRef from '../../../hooks/useScrollToRef'
import './PromoBox.css'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import PromoBoxCard from '../../../components/promo-box-card/PromoBoxCard'

const PromoBox = () => {
  const { refBoxesSection } = useContext(ScrollRefContext)
  const {
    statePromoBoxes: { boxes },
    dispatchPromoBoxes,
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

  return (
    <div ref={refBoxesSection} className='promobox__container'>
      <div className='promobox__cards-container fadeIn'>
        <div className='promobox__card'>
          <div>
            <h3>PROMO BOX</h3>
          </div>
        </div>
      </div>
      {boxes.length > 0 ? (
        <>
          {boxes?.map((box, index) => (
            <PromoBoxCard key={index} box={box} />
          ))}
        </>
      ) : (
        <p>No tienes boxes</p>
      )}
    </div>
  )
}

export default PromoBox
