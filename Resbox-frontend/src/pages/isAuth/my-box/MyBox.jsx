import React, { useContext, useEffect } from 'react'
import useScrollToRef from '../../../hooks/useScrollToRef'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import BoxCard from '../../../components/box-card/BoxCard'
import './MyBox.css'

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
    <div ref={refBoxesSection} className='mybox__container fadeIn'>
      <div className='mybox__cards-container '>
        <div className='mybox__card'>
          <div>
            <h3>MIS BOXES❤️</h3>
            <p className='mybox__paragraph-rotate'>En un solo lugar</p>
            <p className='mybox__user_name'>¡{user.name}!</p>
          </div>
        </div>
      </div>
      {purchasedBoxes.length > 0 ? (
        <>
          {purchasedBoxes?.map((box, index) => (
            <BoxCard key={index} box={box} />
          ))}
        </>
      ) : (
        <p>No tienes boxes</p>
      )}
    </div>
  )
}

export default MyBox
