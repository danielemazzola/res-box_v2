import { useContext, useEffect, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { containInformation, getRandomBackgroundColor } from './helpers'
import { fetchNewOperation } from '../../services/fetch-operation/fetchOperation'
import './BoxCard.css'
import { AuthContext } from '../../context/auth/AuthContext'
import ModalRedeem from './ModalRedeem'
import { getDate } from '../../helpers/date'
import useFilterPartner from '../../hooks/useFilterPartner'
import Modal from '../modal/Modal'

const BoxCard = ({ box }) => {
  const [stateBoxCard, setStateBoxCard] = useState({
    quantityRedeem: 1,
    modalState: false,
    secureTokenRedeem: 0,
    modalStatePartner: false,
    infoPartner: {}
  })
  const {
    dispatchAuth,
    dispatchLoader,
    dispatchToast,
    dispatchPartners,
    statePartners: { arrayFilterPartnersSearch }
  } = useContext(ReducersContext)
  const { API_URL } = useContext(AuthContext)
  const backgroundColor = useMemo(() => getRandomBackgroundColor(), [])
  const newArrayInfoBox = containInformation(box)

  const handleSubmit = async (e, box) => {
    e.preventDefault()
    const token = localStorage.getItem('SECURE_CODE_RESBOX')
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { data } = await fetchNewOperation(
      token,
      API_URL.user_operation,
      box.box._id,
      'POST',
      stateBoxCard.quantityRedeem,
      dispatchLoader,
      dispatchToast
    )
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

  const handleAddMoreBox = async (idBox) => {
    const token = localStorage.getItem('SECURE_CODE_RESBOX')
    try {
      dispatchLoader({ type: 'SET_LOAD_TRUE' })
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/box/buy-box/${idBox}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()
      if (response.status !== 201) {
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: `Error: ${data.message}`, error: true }
        })
      } else {
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: `${data.message}`, error: false }
        })
        dispatchAuth({ type: 'SET_USER', payload: data.updatedUser })
      }
    } catch (error) {
    } finally {
      dispatchLoader({ type: 'SET_LOAD_FALSE' })
      confetti({
        particleCount: 250,
        spread: 170,
        origin: { y: 1.3 }
      })
    }
  }
  const handlePartner = (partner, box) => {
    dispatchPartners({
      type: 'SET_FILTER_SEARCH',
      payload: useFilterPartner(partner, box.id_partner_consumed)
    })
    setStateBoxCard((prevState) => ({
      ...prevState,
      modalStatePartner: true
    }))
  }

  useEffect(() => {
    if (arrayFilterPartnersSearch.length > 0) {
      setStateBoxCard((prevState) => ({
        ...prevState,
        infoPartner: arrayFilterPartnersSearch[0]
      }))
    }
  }, [arrayFilterPartnersSearch])

  const handleCloseModalInfoPartner = () => {
    setStateBoxCard((prevState) => ({
      ...prevState,
      modalStatePartner: false,
      infoPartner: {}
    }))
  }

  return (
    <>
      <div className='boxcard__container fadeIn' style={{ backgroundColor }}>
        <div className='boxcard__title'>
          <p className='boxcard__description'>{box.box.name_box}</p>
        </div>
        <div className='boxcard__contain-information'>
          {newArrayInfoBox.map((info, index) => (
            <div key={index}>
              <p>{info.text}:</p>
              {!info.text.includes('Usado en') ? (
                <p className='boxcar__bg-white'>{info.value}</p>
              ) : (
                box.id_partner_consumed
                  ?.map((partner) => partner.name)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((partner, index) => (
                    <p
                      key={index}
                      className='boxcar__bg-white'
                      onClick={() => handlePartner(partner, box)}
                    >
                      {partner}
                    </p>
                  ))
              )}
            </div>
          ))}
        </div>
        <div className='boxcard__title-active'>
          <p className='boxcard__description-active'>
            Actvos <span>{box.remainingItems}</span>
          </p>
        </div>
        <div className='boxcard__date-active'>
          <p className='boxcard__date'>
            Fecha de compra: {getDate(box.createdAt)}
          </p>
        </div>
        <div className='boxcard__container-btn'>
          <div>
            {box.remainingItems > 0 && (
              <button
                className='button'
                style={{ backgroundColor: 'var(--rb-bg-options)!important' }}
                onClick={() =>
                  setStateBoxCard((prevState) => ({
                    ...prevState,
                    modalState: true
                  }))
                }
              >
                Canjear
              </button>
            )}
            <button
              className='button yellow'
              onClick={() => handleAddMoreBox(box.box._id)}
            >
              Añadir más
            </button>
          </div>
        </div>
      </div>
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
        </div>
      </Modal>
      <ModalRedeem
        box={box}
        remainingItems={box.remainingItems}
        handleSubmit={handleSubmit}
        stateBoxCard={stateBoxCard}
        setStateBoxCard={setStateBoxCard}
      />
    </>
  )
}

export default BoxCard
