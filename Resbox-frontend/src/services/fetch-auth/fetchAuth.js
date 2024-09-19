export const fetchAuth = async (
  urlApi,
  formFields = {},
  method = 'GET',
  dispatchLoader,
  dispatchToast,
  token = null
) => {
  let url = `${import.meta.env.VITE_URL_API}/${urlApi}`

  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const headers = {
      'Content-Type': 'application/json'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const options = {
      method,
      headers
    }
    if (method !== 'GET') {
      options.body = JSON.stringify(formFields)
    }
    const response = await fetch(url, options)
    const data = await response.json()
    return { response, data }
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

export const fetchUpdateAvatar = async (
  formData,
  url,
  token,
  dispatchLoader,
  dispatchToast
) => {
  const urlApi = `${import.meta.env.VITE_URL_API}/${url}`
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const response = await fetch(urlApi, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
    const data = await response.json()
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

export const fetchPartner = async (user, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/partner/${user.idPartner}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data = await response.json()
    return { response, data }
  } catch (error) {}
}