export const fetchGetComments = async (token, API_URL, idPartner) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/${API_URL.get_comments}/${idPartner}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const data = await response.json()
    return {data}
  } catch (error) {
    console.log(error.message)
  }
}
