import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollToRef from '../../hooks/useScrollToRef'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import logo from '/images/logo.png'
import './Header.css'
import Modal from '../modal/Modal'
import Form from '../form-group/Form'

const Header = () => {
  const scrollToRef = useScrollToRef()
  const {
    refHeaderSection,
    refPartnersSection,
    refFunctionAppSection,
    refPartner,
    refFunctionApp
  } = useContext(ScrollRefContext)

  const [openForm, setOpenForm] = useState(false)

  return (
    <>
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
            <button className='button green' onClick={() => setOpenForm(true)}>
              Iniciar
            </button>
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
      <Modal isModalOpen={openForm} handleCloseModal={() => setOpenForm(false)}>
        <Form handleCloseModal={() => setOpenForm(false)} />
      </Modal>
    </>
  )
}

export default Header
