import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import { AuthContext } from '../../../context/auth/AuthContext'
import { updateOperation } from '../../../reducer/promo-box/promobox.action'
import Alert from '../../../components/alert/Alert'

const FormRedeem = () => {
  const [status, setStatus] = useState('')

  const { register, handleSubmit, formState:{errors}, reset, watch } = useForm({
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

  const codeValue = watch('code', '')
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
            errors.code?.type === 'required' ? 'error' : ''
          }`}
          id='code'
          {...register('code', {
            required: {
              value: true,
              message: 'El código es obligatorio'
            },
            minLength: {
              value: 4,
              message: 'Debe tener exactamente 4 dígitos'
            },
            maxLength: {
              value: 4,
              message: 'Debe tener exactamente 4 dígitos'
            }
          })}
          placeholder='1234'
          maxLength={4}
        />
        {errors.code?.message && (
          <Alert>{errors.code.message}</Alert>
        )}
        <div>
          <button
            disabled={codeValue.length !== 4}
            type='submit'
            className='button'
            style={{backgroundColor:'var(--rb-text-cancel)!important'}}
            onClick={() => setStatus('cancelled')}
          >
            Anular
          </button>

          <button
            disabled={codeValue.length !== 4}
            type='submit'
            className='button green'
            onClick={() => setStatus('completed')}
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormRedeem
