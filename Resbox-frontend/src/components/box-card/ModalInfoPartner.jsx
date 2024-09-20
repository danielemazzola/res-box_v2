import React from 'react'
import Modal from '../modal/Modal'

const ModalInfoPartner = ({ stateBoxCard, handleCloseModalInfoPartner }) => {
  return (
    <Modal
      isModalOpen={stateBoxCard.modalStatePartner}
      handleCloseModal={handleCloseModalInfoPartner}
    >
      <div className='modal-content'>
        <img
          className='modal-banner'
          src={stateBoxCard.infoPartner.banner}
          alt={`${stateBoxCard.infoPartner.name} banner`}
        />
        <div className='logo-absolute'>
          <img
            className='partner-avatar'
            src={stateBoxCard.infoPartner.avatar}
            alt={`${stateBoxCard.infoPartner.name} logo`}
            loading='lazy'
          />
        </div>
        <div className='modal-details'>
          <p>{stateBoxCard.infoPartner.name}</p>
          <p>{stateBoxCard.infoPartner.phone}</p>
          <p>{stateBoxCard.infoPartner.address}</p>
          <p>{stateBoxCard.infoPartner.country}</p>
        </div>
        <div className='modal-details-users'>
          {stateBoxCard?.infoPartner?.users?.map((user, index) => (
            <img
              alt={user.name}
              src={user.avatar}
              className='info-avatar-partner'
              style={{ '--index': index }}
              key={index}
              title={user.name}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default ModalInfoPartner
