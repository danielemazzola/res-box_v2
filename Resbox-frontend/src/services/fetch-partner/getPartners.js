export const fetchGetPartners = async (dispatchPartners, dispatchLoader) => {
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const response = await fetch(`${import.meta.env.VITE_URL_API}/partner`)
    const data = await response.json()
    dispatchPartners({ type: 'SET_PARTNERS', payload: data.partners })
  } catch (error) {
    console.log(error)
  } finally {
    setTimeout(() => {
      dispatchLoader({ type: 'SET_LOAD_FALSE' })
    }, 1500)
  }
}
