import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import confetti from 'canvas-confetti'
import { AuthContext } from '../../../context/auth/AuthContext'
import { handleRedeemCode } from './helper'
import { updateOperation } from '../../../reducer/promo-box/promobox.action'

const FormRedeem = () => {
  const [status, setStatus] = useState('')

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      code: '',
      status: ''
    }
  })

  const {
    dispatchLoader,
    dispatchToast,
    dispatchPartners,
    statePartners: { operations }
  } = useContext(ReducersContext)

  const { API_URL, token, setStateModal, stateModal } = useContext(AuthContext)

  const handleSendInfoRedeem = async (props) => {
    props.status = status
    try {
      dispatchLoader({ type: 'SET_LOAD_TRUE' })
      updateOperation(
        API_URL.operation_update,
        props.code,
        'PUT',
        token,
        status,
        operations,
        reset,
        setStateModal,
        stateModal,
        dispatchLoader,
        dispatchToast,
        dispatchPartners
      )
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
  return (
    <div className='dashboard__container-modal'>
      <div>
        <h2>Introduce el codigo</h2>
        <p>El código de 4 dígitos facilitado por tu cliente es único.</p>
      </div>
      <form onSubmit={handleSubmit(handleSendInfoRedeem)}>
        <label htmlFor='code'>Codigo</label>
        <input
          className={`${
            formState.errors.code?.type === 'required' ? 'error' : ''
          }`}
          id='code'
          {...register('code', {
            required: {
              value: true
            }
          })}
          placeholder='1234'
        />
        <div>
          <button
            type='submit'
            className='button'
            onClick={() => setStatus('cancelled')} // Establecer el estado como "cancelled"
          >
            Anular
          </button>

          <button
            type='submit'
            className='button green'
            onClick={() => setStatus('completed')} // Establecer el estado como "completed"
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormRedeem
