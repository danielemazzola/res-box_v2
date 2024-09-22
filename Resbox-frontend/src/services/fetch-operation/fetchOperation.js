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
