import React, { useContext, useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { useForm } from 'react-hook-form'
import useScrollToRef from '../../../hooks/useScrollToRef'
import {
  handleInfoPartner,
  uploadImage
} from '../../../reducer/auth-reducer/auth.action'
import { getOperationsByPartner } from '../../../reducer/partner-reducer/partner.action'
import { AuthContext } from '../../../context/auth/AuthContext'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import ProfileCard from '../../../components/profile-card/ProfileCard'
import PartnerCard from '../../../components/partner-card/PartnerCard'
import OperationCard from '../../../components/operation-card/OperationCard'
import Modal from '../../../components/modal/Modal'
import './Dashboard.css'
import redeemCode from '/images/redeemCode.png'
import restaurante from '/images/restaurante.ico'
import operationsImg from '/images/operations.png'
import edit from '/images/edit.png'
import { sizeImg } from '../../../helpers/sizeImg'
import { handleImageClick } from './helper'

const Dashboard = () => {
  const [stateModal, setStateModal] = useState({
    infoPartner: false,
    infoOperations: false,
    redeem: false
  })

  const {
    stateIsAuth: { user, partner },
    dispatchToast,
    dispatchLoader,
    dispatchAuth,
    statePartners: { operations },
    dispatchPartners
  } = useContext(ReducersContext)

  const { API_URL, token } = useContext(AuthContext)

  const { refDashboardSection, fileInputRef, refPartnerInfo, refOperations } =
    useContext(ScrollRefContext)

  const useScrolltoRef = useScrollToRef()

  useEffect(() => {
    setTimeout(() => {
      useScrolltoRef(refDashboardSection)
    }, 1000)
  }, [])

  const handleImageChange = async (event) => {
    const file = event.target.files[0]
    const size = sizeImg(file)
    if (file && !size) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: {
          msg: 'El archivo es demasiado grande. El tamaño máximo es 5MB',
          error: true
        }
      })
      return
    }
    const formData = new FormData()
    formData.append('avatar', file)
    const { data } = await uploadImage(
      token,
      formData,
      API_URL.user_avatar,
      dispatchLoader,
      dispatchToast
    )
    dispatchAuth({ type: 'SET_USER', payload: data.avatar })
  }

  const handlePartner = async () => {
    if (Object.keys(partner).length <= 0) {
      const { data } = await handleInfoPartner(
        user,
        token,
        dispatchToast,
        dispatchLoader
      )
      dispatchAuth({ type: 'SET_PARTNER', payload: data.partner })
    }
    setTimeout(() => {
      useScrolltoRef(refPartnerInfo)
    }, 500)
    setStateModal((prev) => ({
      ...prev,
      infoPartner: !stateModal.infoPartner
    }))
  }

  const handleRedeemCode = () => {
    setStateModal((prev) => ({
      ...prev,
      redeem: !stateModal.redeem
    }))
  }

  const [status, setStatus] = useState('')
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      code: '',
      status: ''
    }
  })
  const onSubmit = async (props) => {
    props.status = status
    try {
      dispatchLoader({ type: 'SET_LOAD_TRUE' })
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/operation/update-operation/${
          props.code
        }`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: status })
        }
      )
      const data = await response.json()
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
          handleRedeemCode()
        }, 1500)
        reset()
      }
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

  const handleOperations = async () => {
    if (Object.keys(operations).length <= 0) {
      await getOperationsByPartner(
        token,
        API_URL.my_operations,
        dispatchToast,
        dispatchLoader,
        dispatchPartners
      )
    }
    setTimeout(() => {
      useScrolltoRef(refOperations)
    }, 500)
    setStateModal((prev) => ({
      ...prev,
      infoOperations: !stateModal.infoOperations
    }))
  }

  return (
    <div ref={refDashboardSection} className='dashboard__container'>
      <div className='dashboard__cards-container fadeIn'>
        <div className='dashboard__card'>
          <div>
            <h3>Hola👋🏼 ¡{user.name}!</h3>
            <form>
              <input
                ref={fileInputRef}
                type='file'
                accept='.png, .jpeg, .jpg, .gif'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </form>
            <div className='dashboard__contain-avatar'>
              <img alt={user.name} src={user.avatar} width='150' height='150' />
              <img
                alt='edit'
                src={edit}
                className='dashboard__edit-avatar'
                onClick={() => handleImageClick(fileInputRef)}
              />
            </div>
          </div>
        </div>
      </div>
      <ProfileCard array={user} />
      {user.roles.includes('partner') && (
        <>
          <button
            className='dashboard__banner-partner fadeIn'
            onClick={handleOperations}
          >
            <img src={operationsImg} width='150' />
            <div>
              <p>Operaciones</p>
            </div>
          </button>
          <button
            className='dashboard__banner-partner fadeIn'
            onClick={handleRedeemCode}
          >
            <img src={redeemCode} className='dashboard__img-redeem' />
            <div>
              <p>Canjear Código</p>
            </div>
          </button>
          <button
            className='dashboard__banner-partner fadeIn'
            onClick={handlePartner}
          >
            <img src={restaurante} />
            <div>
              <p>Negocio</p>
            </div>
          </button>
          {stateModal.infoPartner && (
            <div ref={refPartnerInfo}>
              <PartnerCard array={partner} />
            </div>
          )}
          {stateModal.infoOperations && (
            <div
              ref={refOperations}
              className='operation__container-operations fadeIn'
            >
              <div className='operation__operations-title'>
                <p>Mis operaciones</p>
                <p>Descubre las 5 últimas operaciones realizadas.</p>
              </div>
              <div className='operation__operations-card'>
                {operations
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                  .slice(0, 5)
                  .map((operation, index) => (
                    <OperationCard key={index} operation={operation} />
                  ))}
              </div>
            </div>
          )}
        </>
      )}
      <Modal
        isModalOpen={stateModal.redeem}
        handleCloseModal={handleRedeemCode}
      >
        <div className='dashboard__container-modal'>
          <div>
            <h2>Introduce el codigo</h2>
            <p>El código de 4 dígitos facilitado por tu cliente es único.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
      </Modal>
    </div>
  )
}

export default Dashboard
