export const fetchNewOperation = async (
  token,
  url,
  idbox,
  method,
  quantityRedeem = 0,
  dispatchLoader,
  dispatchToast
) => {
  console.log({token,
    url,
    idbox,
    method,
    quantityRedeem,
    dispatchLoader,
    dispatchToast});
  
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/${url}/${idbox}`,
      {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ consumed: quantityRedeem })
      }
    )
    const data = await response.json()
    if (response.status !== 201) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: `Error: ${data.message}`, error: true }
      })
    } else {
      return { data }
    }
  } catch (error) {
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: `Error: ${error.message}`, error: true }
    })
  } finally {
    dispatchLoader({ type: 'SET_LOAD_FALSE' })
  }
}
