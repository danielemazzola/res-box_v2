import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import InstallApp from '../install-app/InstallApp'
import useScrollToRef from '../../hooks/useScrollToRef'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import Form from '../form-group/Form'
import Modal from '../modal/Modal'
import Nav from '../nav-bar/Nav'
import Cart from '../cart/Cart'
import './Header.css'
import logo from '/images/logo.png'

const Header = () => {
  const location = useLocation()
  const [locationComments, setLocationComments] = useState(false)
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
    stateIsAuth: { isAuth },
    statePromoBoxes: { cart }
  } = useContext(ReducersContext)

  useEffect(() => {
    if (!isAuth && location.pathname.split('/')[1]) {
      setLocationComments(true)
    } else {
      setLocationComments(false)
    }
  }, [location])

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
            <img alt='logo Res-Box' src={logo} loading='lazy' />
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
              {!locationComments && (
                <>
                  <button
                    ref={refBoxes}
                    onClick={() => scrollToRef(refBoxesSection)}
                    className='button'
                    style={{
                      backgroundColor: 'var(--rb-bg-options) !important'
                    }}
                  >
                    PROMO - BOX
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
                </>
              )}
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
