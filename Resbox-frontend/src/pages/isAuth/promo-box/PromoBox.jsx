import { useContext, useEffect } from 'react'
import './PromoBox.css'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import useScrollToRef from '../../../hooks/useScrollToRef'

const PromoBox = () => {
  const {refBoxesSection}=useContext(ScrollRefContext)
  const useScrolltoRef = useScrollToRef()
  useEffect(()=>{
    setTimeout(() => {
      useScrolltoRef(refBoxesSection)
    }, 1000)
  },[])
  return (<div ref={refBoxesSection} className='mybox__container'>
      <div className='mybox__cards-container fadeIn'>
        <div className='mybox__card'>
          <div>
            <h3>❤️PROMO BOX❤️</h3>
            <div className='mybox__contain-avatar'>
              <img
                alt=''
                src=''
                width='150'
                height='150'
              />
            </div>
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
  )
}

export default PromoBox