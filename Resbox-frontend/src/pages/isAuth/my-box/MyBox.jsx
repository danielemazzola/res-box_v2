import React, { useContext, useEffect } from 'react'
import useScrollToRef from '../../../hooks/useScrollToRef'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import BoxCard from '../../../components/box-card/BoxCard'
import './MyBox.css'
import PromoBox from '../promo-box/PromoBox'

const MyBox = () => {
  const { refBoxesSection } = useContext(ScrollRefContext)
  const useScrolltoRef = useScrollToRef()
  const {
    stateIsAuth: { user }
  } = useContext(ReducersContext)
  const { purchasedBoxes } = user

  useEffect(() => {
    setTimeout(() => {
      useScrolltoRef(refBoxesSection)
    }, 1000)
  }, [])

  return (
    <section ref={purchasedBoxes.length > 0 ? refBoxesSection : null} className='mybox__container fadeIn'>
      <div className='mybox__cards-container'>
        <div className='mybox__card'>
          <div>
            <h3>MIS BOXES</h3>
          </div>
        </div>
      </div>
      {purchasedBoxes.length > 0 ? (
        <>
          {purchasedBoxes?.map((box, index) => (
            <BoxCard key={index} box={box} />
          )).reverse()}
        </>
      ) : (
        <>
          <p className='mybox__no-box' ref={!purchasedBoxes.length > 0 ? refBoxesSection : null}>
            ¿Aún sin tu BOX?
          </p>
          
          <PromoBox />
        </>
      )}
    </section>
  )
}

export default MyBox
