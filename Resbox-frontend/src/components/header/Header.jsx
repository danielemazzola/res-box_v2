import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollToRef from '../../hooks/useScrollToRef'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import Modal from '../modal/Modal'
import Form from '../form-group/Form'
import './Header.css'
import logo from '/images/logo.png'
import InstallApp from '../install-app/InstallApp'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import Nav from '../nav-bar/Nav'

const Header = () => {
  const [openForm, setOpenForm] = useState(false)

  const scrollToRef = useScrollToRef()
  const {
    refHeaderSection,
    refPartnersSection,
    refFunctionAppSection,
    refPartner,
    refFunctionApp,
    refBoxes,
    refBoxesSection
  } = useContext(ScrollRefContext)

  const {
    stateIsAuth: { user, isAuth }
  } = useContext(ReducersContext)

  return (
    <>
      <div
        ref={refHeaderSection}
        className={`${isAuth ? 'contain-hero-auth' : 'contain-hero'}`}
      >
        <div
          className={`${
            isAuth ? 'contain-log-auth waveEffect' : 'contain-log fadeIn'
          } `}
        >
          <Link to='/'>
            <img alt='logo Res-Box' src={logo} />
          </Link>
        </div>
        {!isAuth ? (
          <div className='contain-description'>
            <div className='contain-title-app fadeIn'>
              <h1 className='name-app'>res-box</h1>
              <p>Todas las ofertas en un único lugar</p>
            </div>
            <div className='contain-btn-action fadeIn'>
              <button
                className='button green'
                onClick={() => setOpenForm(true)}
              >
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
              <button
                ref={refBoxes}
                onClick={() => scrollToRef(refBoxesSection)}
                className='button green'
              >
                PROMO - BOX
              </button>
              <InstallApp />
            </div>
          </div>
        ) : (
          <>
            <Nav />
          </>
        )}
      </div>
      <Modal isModalOpen={openForm} handleCloseModal={() => setOpenForm(false)}>
        <Form handleCloseModal={() => setOpenForm(false)} />
      </Modal>
    </>
  )
}

export default Header
