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
    return { data }
  } catch (error) {
    console.log(error.message)
  }
}

export const fetchNewComment = async (url, token, comment) => {
  try {
    const response = await fetch(url,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: comment })
      }
    )
    const data = await response.json()
    return { response, data }
  } catch (error) {
    console.log(error.message)
  }
}
