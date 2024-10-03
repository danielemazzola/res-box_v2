import React, { useContext } from 'react'
import Modal from '../modal/Modal'

import Like from '../like/Like'
import { AuthContext } from '../../context/auth/AuthContext'

const ModalInfoPartner = ({ handleCloseModalInfoPartner }) => {
  const { stateBoxCard } = useContext(AuthContext)
  return (
    <Modal
      isModalOpen={stateBoxCard.modalStatePartner}
      handleCloseModal={handleCloseModalInfoPartner}
    >
      <div className='modal-content'>
        <div className='modal-content-banner'>
          <img
            src={stateBoxCard.infoPartner.banner}
            alt={`${stateBoxCard.infoPartner.name} banner`}
          />
        </div>
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
          <p>{stateBoxCard.infoPartner.city}</p>
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
        <div className='content-favorite'>
          <span>{stateBoxCard.infoPartner.favorite}</span>
          <Like idPartner={stateBoxCard.infoPartner._id} />
        </div>
      </div>
    </Modal>
  )
}

export default ModalInfoPartner
