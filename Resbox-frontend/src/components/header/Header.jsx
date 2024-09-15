import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollToRef from '../../hooks/useScrollToRef'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import Modal from '../modal/Modal'
import Form from '../form-group/Form'
import './Header.css'
import logo from '/images/logo.png'

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
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        setDeferredPrompt(null)
      })
    }
  }

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
      setTimeout(() => {
        setShowInstallPrompt(true)
      }, 2000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
    }
  }, [])

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
            {showInstallPrompt && (
              <button
                ref={refFunctionApp}
                onClick={handleInstallClick}
                className=''
              >
                ¡Instalar RES-BOX!
              </button>
            )}
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
