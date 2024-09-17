import React, { useContext, useEffect } from 'react'
import useScrollToRef from '../../../hooks/useScrollToRef'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import './MyBox.css'

const MyBox = () => {
  const {refBoxesSection}=useContext(ScrollRefContext)
  const useScrolltoRef = useScrollToRef()
  const {stateIsAuth:{user}} = useContext(ReducersContext)

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
            <p className='mybox__paragraph-rotate'>Todos tus BOXES en un solo lugar</p>
            <p>¡{user.name}!</p>
          </div>
        </div>
      </div>
      {/* <ProfileCard array={user} />
      {user.roles.includes('partner') && (
        <>
          <button
            className='mybox__banner-partner fadeIn'
            onClick={handlePartner}
          >
            <img src={restaurante} />
            <div>
              <p>Negocio</p>
            </div>
          </button>
          {Object.keys(partner).length > 0 && (
            <div ref={refPartnerInfo}>
              <PartnerCard array={partner} />
            </div>
          )}
        </>
      )} */}
    </div>
}

export default MyBox
