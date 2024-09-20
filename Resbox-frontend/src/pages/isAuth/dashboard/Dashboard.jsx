import React, { useContext, useEffect, useState } from 'react'
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
import './Dashboard.css'
import edit from '/images/edit.png'
import redeemCode from '/images/redeemCode.png'
import restaurante from '/images/restaurante.ico'
import operationsImg from '/images/operations.png'
import Modal from '../../../components/modal/Modal'
import confetti from 'canvas-confetti'

const Dashboard = () => {
  const {
    stateIsAuth: { user, partner },
    dispatchToast,
    dispatchLoader,
    dispatchAuth,
    statePartners: { operations },
    dispatchPartners
  } = useContext(ReducersContext)
  const {
    API_URL,
    modalRedeem,
    setModalRedeem,
    getOperation,
    setGetOperation,
    token
  } = useContext(AuthContext)
  const { refDashboardSection, fileInputRef, refPartnerInfo, refOperations } =
    useContext(ScrollRefContext)
  const [selectedImage, setSelectedImage] = useState(user.avatar)
  const useScrolltoRef = useScrollToRef()

  useEffect(() => {
    setTimeout(() => {
      useScrolltoRef(refDashboardSection)
    }, 1000)
  }, [])

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    } else {
      return
    }
  }
  const handleImageChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      const formData = new FormData()
      formData.append('avatar', file)
      setSelectedImage(imageUrl)
      const { data } = await uploadImage(
        token,
        formData,
        API_URL.user_avatar,
        dispatchLoader,
        dispatchToast
      )
      dispatchAuth({ type: 'SET_USER', payload: data.avatar })
    }
  }

  const handlePartner = async () => {
    if (Object.keys(partner).length <= 0) {
      await handleInfoPartner(
        user,
        token,
        dispatchAuth,
        dispatchToast,
        dispatchLoader
      )
      setTimeout(() => {
        useScrolltoRef(refPartnerInfo)
      }, 1000)
    } else {
      useScrolltoRef(refPartnerInfo)
    }
  }

  const handleRedeemCode = () => {
    setModalRedeem(true)
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
      } else if (data.updatedOperation) {
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: data.message, error: false }
        })
        dispatchPartners({
          type: 'SET_OPERATIONS',
          payload: [...operations, data.putOperation]
        })
        setTimeout(() => {
          setModalRedeem(false)
          reset()
        }, 1000)
      } else {
        dispatchPartners({
          type: 'SET_OPERATIONS',
          payload: [...operations, data.putOperation]
        })
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: data.message, error: false }
        })
        confetti({
          particleCount: 250,
          spread: 170,
          origin: { y: 1.3 }
        })
        setTimeout(() => {
          setModalRedeem(false)
          reset()
        }, 1000)
      }
    } catch (error) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: error.message, error: false }
      })
    } finally {
      handleOperations()
      setTimeout(() => {
        useScrolltoRef(refOperations)
        dispatchLoader({ type: 'SET_LOAD_FALSE' })
      }, 1500)
    }
  }

  const handleOperations = async () => {
    if (Object.keys(operations).length <= 0) {
      setGetOperation(true)
      await getOperationsByPartner(
        token,
        API_URL.my_operations,
        dispatchToast,
        dispatchLoader,
        dispatchPartners
      )
      setTimeout(() => {
        useScrolltoRef(refOperations)
      }, 1000)
    } else {
      useScrolltoRef(refOperations)
    }
  }

  return (
    <div ref={refDashboardSection} className='dashboard__container'>
      <div className='dashboard__cards-container fadeIn'>
        <div className='dashboard__card'>
          <div>
            <h3>Hola👋🏼 ¡{user.name}!</h3>
            <form>
              <input
                id='changeImage'
                ref={fileInputRef}
                type='file'
                accept='.png, .jpeg, .jpg, .gif'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </form>
            <div className='dashboard__contain-avatar'>
              <img
                alt={user.name}
                src={selectedImage}
                width='150'
                height='150'
              />
              <img
                alt='edit'
                src={edit}
                className='dashboard__edit-avatar'
                onClick={handleImageClick}
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
          {Object.keys(partner).length > 0 && (
            <div ref={refPartnerInfo}>
              <PartnerCard array={partner} />
            </div>
          )}
          {getOperation && (
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
        isModalOpen={modalRedeem}
        handleCloseModal={() => setModalRedeem(!modalRedeem)}
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
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Dashboard
