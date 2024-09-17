import {
  fetchAuth,
  fetchPartner,
  fetchUpdateAvatar
} from '../../services/fetch-auth/fetchAuth'

export const fetchSubmit = async (
  formType,
  formFields,
  handleCloseModal,
  dispatchLoader,
  dispatchToast,
  dispatchAuth,
  token
) => {
  let url
  if (formType.login) url = 'user/login-user'
  if (formType.register) url = 'user/register-user'
  if (formType.forgot) url = 'user/recovery-password-user'
  if (formType.recovery) url = `user/new-password/${token}`

  const { data, response } = await fetchAuth(
    url,
    formFields,
    formType.recovery ? 'PUT' : 'POST',
    dispatchLoader,
    dispatchToast
  )
  if (response.status !== 200) {
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: `Error: ${data.message}`, error: true }
    })
    return false
  } else {
    formType.login
      ? dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: `Bienvenido ${data.user.name}`, error: false }
        })
      : dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: `${data.message}`, error: false }
        })
    dispatchAuth({ type: 'SET_USER', payload: data.user })
    dispatchAuth({ type: 'SET_AUTH_TRUE' })
    if (data?.token) {
      localStorage.setItem('SECURE_CODE_RESBOX', data.token)
    }
    setTimeout(() => {
      !formType.recover && handleCloseModal()
    }, 1000)
    return true
  }
}

export const uploadImage = async (
  formData,
  url,
  dispatchLoader,
  dispatchToast
) => {
  const token = localStorage.getItem('SECURE_CODE_RESBOX')
  const { data } = await fetchUpdateAvatar(
    formData,
    url,
    token,
    dispatchLoader,
    dispatchToast
  )
  return { data }
}

export const handleInfoPartner = async (
  user,
  token,
  dispatchAuth,
  dispatchToast,
  dispatchLoader
) => {
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { response, data } = await fetchPartner(user, token)
    dispatchAuth({ type: 'SET_PARTNER', payload: data.partner })
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

export const handleCloseSesion = (
  dispatchLoader,
  dispatchToast,
  dispatchAuth,
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
  navigate('/')
  setTimeout(() => {
    dispatchLoader({ type: 'SET_LOAD_FALSE' })
  }, 1500)
}