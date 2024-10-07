export const fetchOperation = async (
  token,
  urlApi,
  box,
  method,
  quantityRedeem = 0,
  status = ''
) => {
  let url = `${import.meta.env.VITE_URL_API}/${urlApi}/${box}`
  try {
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
    if (quantityRedeem !== 0) {
      options.body = JSON.stringify({ consumed: quantityRedeem })
    }
    if (status !== '') {
      options.body = JSON.stringify({ status: status })
    }
    const response = await fetch(url, options)
    const data = await response.json()
    return { response, data }
  } catch (error) {
    console.log(error.message)
  }
}

export const fetchBuyBox = async (urlApi, token, cart) => {
  try {
    const response = await fetch(urlApi, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ boxes: cart })
    })
    const data = await response.json()
    return {response, data}
  } catch (error) {
    console.log(error.message);
    
  }
}
