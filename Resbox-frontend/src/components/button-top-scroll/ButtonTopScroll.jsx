import { useContext, useEffect, useState } from 'react'
import useScrollToRef from '../../hooks/useScrollToRef'
import './ButtonTopScroll.css'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import logo from '/images/logo.png'

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
      <div className='container-btn-scroll'>
        <img alt='icono logo resbox' src={logo} width='20' loading='lazy' />
        Volver arriba
      </div>
    </button>
  )
}

export default ButtonTopScroll
