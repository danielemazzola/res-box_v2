import { fetchGetComments } from '../../services/fetch-comment/fetchComments'

export const getComments = async (
  token,
  API_URL,
  idPartner,
  dispatchComments,
  dispatchToast,
  dispatchLoader
) => {
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { data } = await fetchGetComments(token, API_URL, idPartner)
    dispatchComments({ type: 'SET_PARTNER', payload: data.partner })
    dispatchComments({ type: 'SET_COMMENTS', payload: data.comments })
  } catch (error) {
    console.log(error)
  } finally {
  }
  dispatchLoader({ type: 'SET_LOAD_FALSE' })
}
