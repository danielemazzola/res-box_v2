import confetti from 'canvas-confetti'
import { fetchOperation } from '../../services/fetch-operation/fetchOperation'
import { handleRedeemCode } from '../../pages/isAuth/dashboard/helper'

export const handleRedeem = async (
  token,
  url,
  idbox,
  method,
  stateBoxCard,
  setStateBoxCard,
  box,
  dispatchLoader,
  dispatchToast
) => {
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { response, data } = await fetchOperation(
      token,
      url,
      idbox,
      method,
      stateBoxCard.quantityRedeem,
      ''
    )
    if (response.status !== 201) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: `Error: ${data.message}`, error: true }
      })
    } else {
      console.log(data)
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: 'Canje exitoso', error: false }
      })
      setStateBoxCard((prevState) => ({
        ...prevState,
        secureTokenRedeem: data.token
      }))
      box.remainingItems = box.remainingItems - stateBoxCard.quantityRedeem
      confetti({
        particleCount: 250,
        spread: 170,
        origin: { y: 1.3 }
      })
    }
  } catch (error) {
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: error.message, error: true }
    })
  } finally {
    dispatchLoader({ type: 'SET_LOAD_FALSE' })
  }
}

export const handleBuyBox = async (
  token,
  API_URL,
  buyBox,
  method,
  dispatchLoader,
  dispatchToast
) => {
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { response, data } = await fetchOperation(
      token,
      API_URL,
      buyBox,
      method,
      0,
      ''
    )
    if (response.status !== 201) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: `Error: ${data.message}`, error: true }
      })
    } else {
      return { response, data }
    }
  } catch (error) {
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: `Error: ${error.message}`, error: true }
    })
  } finally {
    dispatchLoader({ type: 'SET_LOAD_FALSE' })
  }
}

export const updateOperation = async (
  url,
  code,
  method,
  token,
  status,
  operations,
  reset,
  setStateModal,
  stateModal,
  dispatchLoader,
  dispatchToast,
  dispatchPartners
) => {
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { response, data } = await fetchOperation(
      token,
      url,
      code,
      method,
      0,
      status
    )
    if (response.status !== 201) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: data.message, error: true }
      })
    } else if (data.putOperation) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: data.message, error: false }
      })
      if (operations.length > 0) {
        dispatchPartners({
          type: 'SET_OPERATIONS',
          payload: [...operations, data.putOperation]
        })
      }
      if (data.putOperation.status.includes('completed')) {
        confetti({
          particleCount: 250,
          spread: 170,
          origin: { y: 1.3 }
        })
      }
      setTimeout(() => {
        handleRedeemCode(setStateModal, stateModal)
      }, 1500)
      reset()
    }
    return { response }
  } catch (error) {
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: error.message, error: false }
    })
  } finally {
    setTimeout(() => {
      dispatchLoader({ type: 'SET_LOAD_FALSE' })
    }, 1500)
  }
}
