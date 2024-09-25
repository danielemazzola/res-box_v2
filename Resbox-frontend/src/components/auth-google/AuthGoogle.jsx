import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import google from '/images/google.png'
import './AuthGoogle.css'

const AuthGoogle = () => {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/user/auth-google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_token: credentialResponse }) // Asegúrate de enviar el ID token
        }
      )

      const data = await response.json()
      console.log('Respuesta del servidor:', data)
    } catch (error) {
      console.error('Error al autenticar el usuario:', error)
    }
  }

  const handleCustomLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => handleLoginSuccess(credentialResponse),
    onError: () => console.log('Hubo un error de autenticación.')
  })

  return (
    <>
      <img
        onClick={handleCustomLogin}
        src={google}
        className='google__btn-login'
        title='Inicia sesión con Google'
      />
    </>
  )
}

export default AuthGoogle
