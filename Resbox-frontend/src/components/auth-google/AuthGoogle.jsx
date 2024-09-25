import React, { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import google from '/images/google.png'
import './AuthGoogle.css'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const AuthGoogle = ({ handleCloseModal }) => {
  const navigate = useNavigate()

  const { dispatchToast, dispatchAuth, dispatchLoader } =
    useContext(ReducersContext)

  const { setToken } = useContext(AuthContext)

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      dispatchLoader({ type: 'SET_LOAD_TRUE' })
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/user/auth-google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id_token: credentialResponse })
        }
      )
      const data = await response.json()
      if (response.status !== 200) {
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: `Error: ${data.message}`, error: true }
        })
      } else {
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: `Bienvenido ${data.user.name}`, error: false }
        })
        dispatchAuth({ type: 'SET_USER', payload: data.user })
        dispatchAuth({ type: 'SET_AUTH_TRUE' })
        localStorage.setItem('SECURE_CODE_RESBOX', data.token)
        setToken(localStorage.getItem('SECURE_CODE_RESBOX'))
        setTimeout(() => {
          navigate('./dashboard')
        }, 500)
      }
      setTimeout(() => {
        handleCloseModal()
      }, 500)
    } catch (error) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: error.message, error: true }
      })
    } finally {
      setTimeout(() => {
        dispatchLoader({ type: 'SET_LOAD_FALSE' })
      }, 1500)
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
