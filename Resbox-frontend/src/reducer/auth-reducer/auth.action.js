import { fetchAuth } from '../../services/fetch-auth/fetchAuth'

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
    dispatchAuth({ type: 'SET_USER', payload: data })
    if (data?.token) {
      localStorage.setItem('SECURE_CODE_RESBOX', data.token)
    }
    setTimeout(() => {
      !formType.recover && handleCloseModal()
    }, 1000)
    return true
  }
}
