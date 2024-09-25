import { useContext, useEffect, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import useFilterPartner from '../../hooks/useFilterPartner'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { containInformation, getRandomBackgroundColor } from './helpers'
import { handleBuyBox } from '../../reducer/promo-box/promobox.action'
import ModalRedeem from './ModalRedeem'
import ModalInfoPartner from './ModalInfoPartner'
import { getDate } from '../../helpers/date'
import './BoxCard.css'

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
    statePromoBoxes: { boxes },
    dispatchPromoBoxes,
    statePartners: { arrayFilterPartnersSearch }
  } = useContext(ReducersContext)
  const { API_URL, token } = useContext(AuthContext)
  const backgroundColor = useMemo(() => getRandomBackgroundColor(), [box])
  const newArrayInfoBox = containInformation(box)

  const handleAddMoreBox = async (idBox) => {
    const { response, data } = await handleBuyBox(
      token,
      API_URL.user_add_more,
      idBox,
      'POST',
      dispatchLoader,
      dispatchToast
    )
    if (boxes.length > 0) {
      const updatedBoxes = boxes.map((box) => {
        if (box._id.toString() === idBox.toString()) {
          return {
            ...box,
            items_acquired_by: [...box.items_acquired_by, data.updatedUser]
          }
        }
        return box
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
                <p className='boxcard__bg-white'>{info.value}</p>
              ) : (
                box.id_partner_consumed
                  ?.map((partner) => partner.name)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((partner, index) => (
                    <p
                      key={index}
                      className='boxcard__bg-white'
                      style={{ cursor: 'pointer' }}
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
              disabled={!box?.box.status.includes('active')}
              className={`button yellow ${
                box.box.status.includes('active') ? 'active' : 'disabled'
              }`}
              onClick={() => handleAddMoreBox(box.box._id)}
            >
              Añadir más
            </button>
          </div>
        </div>
      </div>
      <ModalInfoPartner
        stateBoxCard={stateBoxCard}
        handleCloseModalInfoPartner={handleCloseModalInfoPartner}
      />
      <ModalRedeem
        box={box}
        remainingItems={box.remainingItems}
        stateBoxCard={stateBoxCard}
        setStateBoxCard={setStateBoxCard}
      />
    </>
  )
}

export default BoxCard
