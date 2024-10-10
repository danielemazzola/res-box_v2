import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { handleBuyBox } from '../../reducer/promo-box/promobox.action'
import ModalRedeem from './ModalRedeem'
import { getDate } from '../../helpers/date'
import { containInformation } from './helpers'
import ModalInfoPartner from './ModalInfoPartner'
import './BoxCard.css'

const BoxCard = ({ box }) => {
  const navigate = useNavigate()
  const {
    dispatchAuth,
    dispatchLoader,
    dispatchToast,
    dispatchPartners,
    statePromoBoxes: { boxes },
    dispatchPromoBoxes,
    statePartners: { arrayFilterPartnersSearch },
    dispatchInvoice
  } = useContext(ReducersContext)
  const {
    API_URL,
    token,
    handleCloseModalInfoPartner,
    stateBoxCard,
    setStateBoxCard
  } = useContext(AuthContext)
  const newArrayInfoBox = containInformation(box)

  const handleAddMoreBox = async (idBox) => {
    try {
      const { response, data } = await handleBuyBox(
        token,
        API_URL.user_add_more,
        idBox,
        'POST',
        dispatchLoader,
        dispatchToast
      )
      if (boxes.length > 0) {
        const updatedBoxes = boxes.map((boxItem) => {
          if (boxItem._id.toString() === idBox.toString()) {
            return {
              ...boxItem,
              items_acquired_by: [
                ...boxItem.items_acquired_by,
                data.updatedUser
              ]
            }
          }
          return boxItem
        })

        dispatchPromoBoxes({
          type: 'SET_BOXES',
          payload: updatedBoxes
        })
      }
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: `${data.message}`, error: false }
      })
      dispatchAuth({ type: 'SET_USER', payload: data.updatedUser })
      confetti({
        particleCount: 250,
        spread: 170,
        origin: { y: 1.3 }
      })
      dispatchInvoice({ type: 'SET_INVOICES', payload: data.invoice })
      dispatchInvoice({ type: 'SET_INVOICE', payload: data.invoice })
      navigate(`../invoice/${data.invoice._id}`)
    } catch (error) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: `${error.message}`, error: true }
      })
    }
  }

  const openModal = (options = {}) => {
    setStateBoxCard((prevState) => ({
      ...prevState,
      ...options
    }))
  }

  const handlePartner = (partner) => {
    openModal({ infoPartner: partner, modalStatePartner: true })
  }

  const handleRedeem = (thisBox) => {
    openModal({ modalState: true, box: thisBox })
  }

  useEffect(() => {
    if (arrayFilterPartnersSearch.length > 0) {
      setStateBoxCard((prevState) => ({
        ...prevState,
        infoPartner: arrayFilterPartnersSearch[0]
      }))
    }
  }, [arrayFilterPartnersSearch])

  const uniquePartners = Array.from(
    new Map(
      box.id_partner_consumed.map((partner) => [partner.name, partner])
    ).values()
  )

  return (
    <>
      <div className='boxcard__container fadeIn'>
        <div className='boxcard__title'>
          <p className='boxcard__description'>{box.box.name_box}</p>
        </div>
        <div className='boxcard__contain-information'>
          {newArrayInfoBox.map((info, index) => (
            <div key={index}>
              <p>{info.text}:</p>
              {!info.text.includes('Usado en') ? (
                <p className='boxcard__bg-white'>{info.value}</p>
              ) : (
                <>
                  {uniquePartners.map((partner, index) => (
                    <button
                      key={index}
                      className='boxcard__btn-info-partner'
                      style={{ cursor: 'pointer' }}
                      onClick={() => handlePartner(partner)}
                    >
                      {partner.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>

        <div className='boxcard__date-active'>
          <p className='boxcard__date'>
            Fecha de compra: {getDate(box.createdAt)}
          </p>
        </div>
        <div className='boxcard__title-active'>
          <p className='boxcard__description-active'>
            Actvos <span>{box.remainingItems}</span>
          </p>
        </div>
        <div className='boxcard__container-btn'>
          <div>
            {box.remainingItems > 0 && (
              <button
                className='button green'
                onClick={() => handleRedeem(box)}
              >
                Canjear
              </button>
            )}

            <button
              disabled={!box?.box.status.includes('active')}
              className={`button ${
                box.box.status.includes('active') ? 'active' : 'disabled'
              }`}
              style={{ backgroundColor: 'var(--rb-bg-options)!important' }}
              onClick={() => handleAddMoreBox(box.box._id)}
            >
              Añadir más
            </button>
          </div>
        </div>
      </div>
      <ModalInfoPartner box={box} />
      <ModalRedeem
        stateBoxCard={stateBoxCard}
        setStateBoxCard={setStateBoxCard}
      />
    </>
  )
}

export default BoxCard
