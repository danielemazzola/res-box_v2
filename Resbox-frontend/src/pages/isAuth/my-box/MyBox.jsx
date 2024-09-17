import React, { useContext, useEffect } from 'react'
import useScrollToRef from '../../../hooks/useScrollToRef'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import BoxCard from '../../../components/box-card/BoxCard'
import './MyBox.css'

const MyBox = () => {
  const {refBoxesSection}=useContext(ScrollRefContext)
  const useScrolltoRef = useScrollToRef()
  const {stateIsAuth:{user}} = useContext(ReducersContext)
console.log(user);

  useEffect(()=>{
    setTimeout(() => {
      useScrolltoRef(refBoxesSection)
    }, 1000)
  },[])
  return <div ref={refBoxesSection} className='mybox__container'>
      <div className='mybox__cards-container fadeIn'>
        <div className='mybox__card'>
          <div>
            <h3>MIS BOXES❤️</h3>
            <p className='mybox__paragraph-rotate'>En un solo lugar</p>
            <p>¡{user.name}!</p>
          </div>
        </div>
      </div>
      <BoxCard array={user} />
    </div>
}

export default MyBox
