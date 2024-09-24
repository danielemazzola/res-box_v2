import {
  createPartner,
  fetchAuth,
  fetchPartner,
  fetchUpdateImg
} from '../../services/fetch-auth/fetchAuth'

export const fetchSubmit = async (
  formType,
  formFields,
  handleCloseModal,
  dispatchLoader,
  dispatchToast,
  dispatchAuth,
  token,
  setToken
) => {
  let url
  if (formType.login) url = 'user/login-user'
  if (formType.register) url = 'user/register-user'
  if (formType.forgot) url = 'user/recovery-password-user'
  if (formType.recovery) url = `user/new-password/${token}`

  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { data, response } = await fetchAuth(
      url,
      formFields,
      formType.recovery ? 'PUT' : 'POST',
      token
    )
    if (response.status !== 200) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: `Error: ${data.message}`, error: true }
      })
      return false
    }
    if (formType.login) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: `Bienvenido ${data.user.name}`, error: false }
      })
      dispatchAuth({ type: 'SET_USER', payload: data.user })
      dispatchAuth({ type: 'SET_AUTH_TRUE' })
    } else {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: `${data.message}`, error: false }
      })
    }
    if (data?.token) {
      localStorage.setItem('SECURE_CODE_RESBOX', data.token)
      setToken(localStorage.getItem('SECURE_CODE_RESBOX'))
    }
    setTimeout(() => {
      !formType.recover && handleCloseModal()
    }, 1000)
    return true
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

export const uploadImage = async (
  token,
  formData,
  url,
  dispatchLoader,
  dispatchToast
) => {
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { response, data } = await fetchUpdateImg(formData, url, token)
    if (response.status !== 200) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: 'Error al subir la imagen', error: true }
      })
      return
    }
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: data.message, error: false }
    })
    return { data }
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

export const handleInfoPartner = async (
  user,
  token,
  dispatchToast,
  dispatchLoader
) => {
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { response, data } = await fetchPartner(user, token)
    if (response.status !== 200) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: data.message, error: true }
      })
    } else {
      return { data }
    }
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

export const newPartner = async (
  setOpenModal,
  dispatchLoader,
  dispatchToast,
  dispatchAuth,
  reset,
  navigate,
  API_URL,
  token,
  formFields
) => {
  const url = `${import.meta.env.VITE_URL_API}/${API_URL.new_partner}`
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { response, data } = await createPartner(url, token, formFields)
    if (response.status !== 201) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: {
          msg: data.message,
          error: true
        }
      })
    } else {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: {
          msg: data.message,
          error: false
        }
      })
      dispatchAuth({ type: 'SET_USER', payload: data.user })
      dispatchAuth({ type: 'SET_PARTNER', payload: data.partner })
      reset()
      setTimeout(() => {
        setOpenModal(false)
      }, 500);
      setTimeout(() => {
        navigate('../dashboard')
      }, 1000)
    }
  } catch (error) {
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: {
        msg: error.message,
        error: true
      }
    })
  } finally {
    setTimeout(() => {
      dispatchLoader({ type: 'SET_LOAD_FALSE' })
    }, 1500)
  }
}

export const handleCloseSesion = (
  dispatchLoader,
  dispatchToast,
  dispatchAuth,
  dispatchPartners,
  navigate,
  user
) => {
  dispatchLoader({ type: 'SET_LOAD_TRUE' })
  localStorage.removeItem('SECURE_CODE_RESBOX')
  dispatchToast({
    type: 'ADD_NOTIFICATION',
    payload: { msg: `Gracias por visitarnos❤️ ${user.name}`, error: false }
  })
  dispatchAuth({ type: 'SET_USER', payload: {} })
  dispatchAuth({ type: 'SET_PARTNER', payload: {} })
  dispatchAuth({ type: 'SET_AUTH_FALSE' })
  dispatchPartners({ type: 'SET_OPERATIONS', payload: [] })
  navigate('/')
  setTimeout(() => {
    dispatchLoader({ type: 'SET_LOAD_FALSE' })
  }, 1500)
}
