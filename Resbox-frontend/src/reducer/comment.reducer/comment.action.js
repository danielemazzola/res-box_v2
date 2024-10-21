import {
  fetchGetComments,
  fetchNewComment
} from '../../services/fetch-comment/fetchComments'

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

export const handleNewComment = async (
  url,
  token,
  newComment,
  dispatchLoader,
  dispatchToast
) => {
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { response, data } = await fetchNewComment(url, token, newComment)
    if (response.status !== 201) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: data.message, error: true }
      })
      return
    }
    return { data }
  } catch (error) {
    console.log(error)
  } finally {
    dispatchLoader({ type: 'SET_LOAD_FALSE' })
  }
}

export const handleReply = async (
  reply,
  url,
  token,
  dispatchLoader,
  dispatchToast
) => {
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { response, data } = await fetchNewComment(url, token, reply)
    if (response.status !== 201) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: data.message, error: true }
      })
      return
    }
    return { data }
  } catch (error) {
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: error.message, error: true }
    })
  } finally {
    dispatchLoader({ type: 'SET_LOAD_FALSE' })
  }
}
