import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../modal/Modal'

import Like from '../like/Like'
import { AuthContext } from '../../context/auth/AuthContext'

const ModalInfoPartner = ({ box, handleCloseModalInfoPartner }) => {
  const { stateBoxCard } = useContext(AuthContext)
  return (
    <Modal
      isModalOpen={stateBoxCard.modalStatePartner}
      handleCloseModal={handleCloseModalInfoPartner}
    >
      <div className='modal-content'>
        <div className='modal-content-banner'>
          <img
            loading='lazy'
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
              loading='lazy'
              alt={user.name}
              src={user.avatar}
              className='info-avatar-partner'
              style={{ '--index': index }}
              key={index}
              title={user.name}
            />
          ))}
        </div>
        {/* <div className='content-comments-card-partner'>
          <Link to={`../comments/${stateBoxCard.infoPartner._id}`}>Comenatarios</Link>
        </div> */}
        <div className='content-favorite'>
          <Like idPartner={stateBoxCard.infoPartner._id} box={box} />
        </div>
      </div>
    </Modal>
  )
}

export default ModalInfoPartner
