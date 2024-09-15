export const fetchAuth = async (
  urlApi,
  formFields = {}, // formFields es opcional
  method = 'GET', // método por defecto es GET
  dispatchLoader,
  dispatchToast,
  token = null // token es opcional
) => {
  let url = `${import.meta.env.VITE_URL_API}/${urlApi}`

  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })

    const headers = {
      'Content-Type': 'application/json'
    }

    // Si existe un token, lo añadimos al header como Bearer token
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const options = {
      method,
      headers
    }

    // Solo agregar el cuerpo de la solicitud si el método no es GET
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
