import React, { useContext, useEffect, useState } from 'react'
import useScrollToRef from '../../../hooks/useScrollToRef'
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
import { handleImageClick, handleRedeemCode } from './helper'
import FormRedeem from './FormRedeem'

const Dashboard = () => {
  const useScrolltoRef = useScrollToRef()

  const {
    stateIsAuth: { user, partner },
    statePartners: { operations }
  } = useContext(ReducersContext)

  const {
    handleImageChange,
    handlePartner,
    handleOperations,
    stateModal,
    setStateModal
  } = useContext(AuthContext)

  const { refDashboardSection, fileInputRef, refOperations } =
    useContext(ScrollRefContext)

  useEffect(() => {
    setTimeout(() => {
      useScrolltoRef(refDashboardSection)
    }, 1000)
  }, [])

  return (
    <section ref={refDashboardSection} className='dashboard__container'>
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
                onChange={(e) => handleImageChange(e)}
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
            onClick={() => handleOperations(setStateModal, stateModal)}
          >
            <img src={operationsImg} width='150' />
            <div>
              <p>Operaciones</p>
            </div>
          </button>
          <button
            className='dashboard__banner-partner fadeIn'
            onClick={() => handleRedeemCode(setStateModal, stateModal)}
          >
            <img src={redeemCode} className='dashboard__img-redeem' />
            <div>
              <p>Canjear Código</p>
            </div>
          </button>
          <button
            className='dashboard__banner-partner fadeIn'
            onClick={() => handlePartner(setStateModal, stateModal)}
          >
            <img src={restaurante} />
            <div>
              <p>Negocio</p>
            </div>
          </button>
          {stateModal.infoPartner && (
            <PartnerCard array={partner} />
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
        handleCloseModal={() => handleRedeemCode(setStateModal, stateModal)}
      >
        <FormRedeem />
      </Modal>
    </section>
  )
}

export default Dashboard
