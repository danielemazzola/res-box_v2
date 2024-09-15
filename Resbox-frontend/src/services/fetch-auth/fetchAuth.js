export const fetchAuth = async (
  urlApi,
  formFields,
  method,
  dispatchLoader,
  dispatchToast
) => {
  let url = `${import.meta.env.VITE_URL_API}/${urlApi}`
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formFields)
    })
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
