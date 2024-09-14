import { Link } from 'react-router-dom'
import useScrollToRef from '../../hooks/useScrollToRef'
import logo from '/images/logo.png'
import './Header.css'
import { useContext } from 'react'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'

const Header = () => {
  const scrollToRef = useScrollToRef()
  const {
    refPartnersSection,
    refFunctionAppSection,
    refPartner,
    refFunctionApp
  } = useContext(ScrollRefContext)

  return (
    <div>
      <div>
        <Link to='/'>
          <img alt='logo Res-Box' src={logo} />
        </Link>
      </div>
      <div>
        <div>
          <h1>res-box</h1>
          <p>Todas las ofertas en un único lugar</p>
        </div>
        <div>
          <button className=''>Login</button>
          <button
            ref={refPartner}
            onClick={() => scrollToRef(refPartnersSection)}
            className=''
          >
            Colaboradores
          </button>
          <button
            ref={refFunctionApp}
            onClick={() => scrollToRef(refFunctionAppSection)}
            className=''
          >
            ¿Cómo funciona?
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
