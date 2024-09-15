import { useContext, useEffect, useState } from 'react'
import useScrollToRef from '../../hooks/useScrollToRef'
import './ButtonTopScroll.css'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'

const ButtonTopScroll = () => {
  const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false)
  const scrollToRef = useScrollToRef()
  const { refHeaderSection } = useContext(ScrollRefContext)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollToTopBtn(true)
      } else {
        setShowScrollToTopBtn(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      id='scrollToTopBtn'
      className={`${showScrollToTopBtn ? 'show-btn' : 'no-show'}`}
      onClick={() => scrollToRef(refHeaderSection)}
    >
      Volver arriba
    </button>
  )
}

export default ButtonTopScroll
