export const fetchGetPartners = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/partner`)
    const data = await response.json()
    return { data }
  } catch (error) {
    console.log(error.message)
  }
}
export const fetchGetOperations = async (token, url) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    return { response, data }
  } catch (error) {
    console.log(error.message)
  }
}
