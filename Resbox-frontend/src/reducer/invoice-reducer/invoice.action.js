import { fetchBuyBox } from '../../services/fetch-operation/fetchOperation'

export const buyBox = async (
  dispatchLoader,
  urlApi,
  token,
  cart,
  dispatchToast,
  dispatchAuth,
  dispatchInvoice,
  dispatchPromoBoxes
) => {
  dispatchLoader({ type: 'SET_LOAD_TRUE' })
  try {
    const { response, data } = await fetchBuyBox(urlApi, token, cart)
    if (response.status !== 201) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: data.message, error: true }
      })
      return
    }
    dispatchAuth({ type: 'SET_USER', payload: data.updatedUser })
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: data.message, error: false }
    })
    dispatchInvoice({ type: 'SET_INVOICES', payload: data.invoice })
    dispatchInvoice({ type: 'SET_INVOICE', payload: data.invoice })
    dispatchPromoBoxes({ type: 'SET_DELETE_CART' })
    dispatchPromoBoxes({ type: 'SET_BOXES', payload: data.boxes })
    return { response, data }
  } catch (error) {
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: error.message, error: true }
    })
  } finally {
    dispatchLoader({ type: 'SET_LOAD_FALSE' })
  }
}
