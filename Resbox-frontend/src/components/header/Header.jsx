import { Link } from 'react-router-dom'
import useScrollToRef from '../../hooks/useScrollToRef'
import logo from '/images/logo.png'
import './Header.css'
import { useContext } from 'react'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'

const Header = () => {
  const scrollToRef = useScrollToRef()
  const {
    refHeaderSection,
    refPartnersSection,
    refFunctionAppSection,
    refPartner,
    refFunctionApp
  } = useContext(ScrollRefContext)

  return (
    <div ref={refHeaderSection} className='contain-hero'>
      <div className='contain-log fadeIn'>
        <Link to='/'>
          <img alt='logo Res-Box' src={logo} />
        </Link>
      </div>
      <div className='contain-description'>
        <div className='contain-title-app fadeIn'>
          <h1 className='name-app'>res-box</h1>
          <p>Todas las ofertas en un único lugar</p>
        </div>
        <div className='contain-btn-action fadeIn'>
          <button className='button green'>Iniciar</button>
          <button
            ref={refPartner}
            onClick={() => scrollToRef(refPartnersSection)}
            className='button yellow'
          >
            Colaboradores
          </button>
          <button
            ref={refFunctionApp}
            onClick={() => scrollToRef(refFunctionAppSection)}
            className='button'
          >
            ¿Cómo funciona?
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
