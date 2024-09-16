export const fetchAuth = async (
  urlApi,
  formFields = {},
  method = 'GET', // Valor por defecto para method
  dispatchLoader,
  dispatchToast,
  token = null // Token opcional
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
  token,
  dispatchLoader,
  dispatchToast
) => {
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/user/update-avatar`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    )
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
