export const fetchGetPartners = async (dispatchPartners) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/partner`)
    const data = await response.json()
    dispatchPartners({ type: 'SET_PARTNERS', payload: data.partners })
  } catch (error) {
    console.log(error)
  }
}
