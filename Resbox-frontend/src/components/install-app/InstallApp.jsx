import { useEffect, useState } from 'react'
import './InstallApp.css'
import logo from '/images/logo.png'
const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

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

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          setShowInstallPrompt(false)
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        setDeferredPrompt(null)
      })
    }
  }

  return (
    <>
      {showInstallPrompt && (
        <button
          className={`install-app ${showInstallPrompt && 'fadeIn'}`}
          onClick={handleInstallClick}
        >
          <p>¡Instalar RES-BOX!</p>
          <img src={logo} alt='logo res-box' width='65' loading='lazy' />
          <p className='heart waveEffect'>❤️</p>
          <p className='work-install-app'>Descargame ¡YA!</p>
        </button>
      )}
    </>
  )
}

export default InstallApp
