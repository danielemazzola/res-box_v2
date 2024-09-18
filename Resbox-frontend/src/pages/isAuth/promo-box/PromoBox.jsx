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
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoBox