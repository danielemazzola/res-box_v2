import confetti from 'canvas-confetti'
import {fetchNewOperation}  from '../../services/fetch-operation/fetchOperation'
export const handleBuyBox = async (
  API_URL,
  buyBox,
  dispatchLoader,
  dispatchAuth,
  dispatchToast
) => {
  const token = localStorage.getItem('SECURE_CODE_RESBOX')
  try {
    const { data } = await fetchNewOperation(
      token,
      API_URL.user_add_more,
      buyBox._id,
      'POST',
      0,
      dispatchLoader,
      dispatchToast
    )
    dispatchAuth({ type: 'SET_USER', payload: data.updatedUser })
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: data.message, error: false }
    })
    confetti({
      particleCount: 250,
      spread: 170,
      origin: { y: 1.3 }
    })
  } catch (error) {
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: error.message, error: true }
    })
  }
}
