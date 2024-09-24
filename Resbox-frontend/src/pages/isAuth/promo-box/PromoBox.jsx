import { useContext, useEffect, useState } from 'react'
import useScrollToRef from '../../../hooks/useScrollToRef'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import PromoBoxCard from '../../../components/promo-box-card/PromoBoxCard'
import './PromoBox.css'
import { useLocation } from 'react-router-dom'

const PromoBox = () => {
  const [message, setMessage] = useState('')
  const location = useLocation()
  const { refBoxesSection } = useContext(ScrollRefContext)
  const {
    statePromoBoxes: { boxes },
    dispatchPromoBoxes,
    dispatchLoader,
    stateIsAuth: { user }
  } = useContext(ReducersContext)
  const useScrolltoRef = useScrollToRef()
  useEffect(() => {
    if (location.pathname === '/promo-box') {
      setTimeout(() => {
        if (Object.keys(user).length > 0) {
          useScrolltoRef(refBoxesSection)
        }
      }, 1000)
    }
  }, [])
  useEffect(() => {
    const getAllPromoBox = async () => {
      try {
        dispatchLoader({ type: 'SET_LOAD_TRUE' })
        const response = await fetch(`${import.meta.env.VITE_URL_API}/box`)
        const data = await response.json()
        setMessage(data.message)

        dispatchPromoBoxes({ type: 'SET_BOXES', payload: data.boxes })
      } catch (error) {
      } finally {
        setTimeout(() => {
          dispatchLoader({ type: 'SET_LOAD_FALSE' })
        }, 1500)
      }
    }
    if (boxes.length > 0) return
    else getAllPromoBox()
  }, [])

  return (
    <section ref={refBoxesSection} className='promobox__container fadeIn'>
      <div className='promobox__cards-container'>
        <div className='promobox__card'>
          <div>
            <h3>PROMO BOX</h3>
          </div>
        </div>
      </div>
      {boxes.length > 0 ? (
        <>
          {boxes
            ?.filter((box) => box.status.includes('active'))
            .map((box, index) => (
              <PromoBoxCard key={index} box={box} />
            ))}
          {boxes
            ?.filter((box) => box.status.includes('inactive'))
            .map((box, index) => (
              <PromoBoxCard key={index} box={box} />
            ))}
        </>
      ) : (
        <p className='show'>{message}</p>
      )}
    </section>
  )
}

export default PromoBox
