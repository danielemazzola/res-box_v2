export const fetchGetPartners = async (dispatch) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/partner`)
    const data = await response.json()
    dispatch({ type: 'SET_PARTNERS', payload: data.partners })
  } catch (error) {
    console.log(error)
  }
}
