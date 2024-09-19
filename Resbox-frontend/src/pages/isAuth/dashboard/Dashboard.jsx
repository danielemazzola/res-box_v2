import React, { useContext, useEffect, useState } from 'react'
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

const Dashboard = () => {
  const {
    stateIsAuth: { user, partner },
    dispatchToast,
    dispatchLoader,
    dispatchAuth,
    statePartners: { operations },
    dispatchPartners
  } = useContext(ReducersContext)
  const { API_URL } = useContext(AuthContext)
  const { refDashboardSection, fileInputRef, refPartnerInfo, refOperations } =
    useContext(ScrollRefContext)
  const [selectedImage, setSelectedImage] = useState(user.avatar)
  const [token, setToken] = useState(localStorage.getItem('SECURE_CODE_RESBOX'))
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
    console.log('hola')
  }
  const handleOperations = async () => {
    const token = localStorage.getItem('SECURE_CODE_RESBOX')
    if (Object.keys(operations).length <= 0) {
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
          {Object.keys(operations).length > 0 && (
            <OperationCard operations={operations} />
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard
