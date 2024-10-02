export const fetchLike = async (urlApi, token) => {
  try {
    const response = await fetch(
      urlApi,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data = await response.json()
    return { response, data }
  } catch (error) {
    console.log(error.message)
  }
}
