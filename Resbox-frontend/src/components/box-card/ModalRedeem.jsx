import React, { useContext } from 'react'
import Modal from '../modal/Modal'
import { AuthContext } from '../../context/auth/AuthContext'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { handleRedeem } from '../../reducer/promo-box/promobox.action'
import logo from '/images/logo.png'

const ModalRedeem = ({ stateBoxCard, setStateBoxCard }) => {
  const { box } = stateBoxCard
  const { remainingItems } = box

  const { quantityRedeem } = stateBoxCard
  const { API_URL, token } = useContext(AuthContext)
  const { dispatchToast, dispatchLoader } = useContext(ReducersContext)

  const handleCloseModal = () => {
    setStateBoxCard((prevState) => ({
      ...prevState,
      modalState: false
    }))
    setTimeout(() => {
      setStateBoxCard((prevState) => ({
        quantityRedeem: 1,
        modalState: false,
        secureTokenRedeem: 0,
        modalStatePartner: false,
        infoPartner: {},
        box: {}
      }))
    }, 500)
  }

  const handleSubmit = async (e, box) => {
    e.preventDefault()
    await handleRedeem(
      token,
      API_URL.user_operation,
      box?.box?._id,
      'POST',
      stateBoxCard,
      setStateBoxCard,
      box,
      dispatchLoader,
      dispatchToast
    )
  }

  return (
    <>
      <Modal
        isModalOpen={stateBoxCard.modalState}
        handleCloseModal={handleCloseModal}
      >
        <div className='boxcard__container-form'>
          <div className='boxcard__contain-form'>
            <div className='boxcard__container-img-form'>
              <div className='boxcard__contain-img-title'>
                <img
                  src={logo}
                  alt='Logo Res-Box'
                  className='waveEffect'
                  loading='lazy'
                />
                <h1>{box?.box?.name_box}</h1>
              </div>
              <div className='boxcard__target-description-form boxcard__center'>
                <p>Canjear</p>
                <p>{stateBoxCard?.quantityRedeem}</p>
              </div>
            </div>
            <p>Restantes: {remainingItems} (unid.)</p>
            {stateBoxCard.secureTokenRedeem !== 0 ? (
              <div className={`boxcard__secureTokenRedeem-container fadeIn`}>
                <p>"Muestra este código en tu establecimiento favorito"</p>
                <p className='boxcard__secureTokenRedeem'>
                  {stateBoxCard.secureTokenRedeem}
                </p>
              </div>
            ) : (
              <form
                className='boxcard__form'
                onSubmit={(e) => handleSubmit(e, box)}
              >
                <div>
                  <button
                    type='button'
                    className='boxcard__btn-select-quantity'
                    onClick={() => {
                      if (stateBoxCard.quantityRedeem === 1) return
                      setStateBoxCard((prevState) => ({
                        ...prevState,
                        quantityRedeem: quantityRedeem - 1
                      }))
                    }}
                  >
                    {'<'}
                  </button>
                  <input
                    disabled
                    name='quantity'
                    min={1}
                    max={9}
                    value={stateBoxCard.quantityRedeem || 1}
                    onChange={(e) => {
                      const value = Math.max(
                        1,
                        Math.min(Number(e.target.value), remainingItems)
                      )
                      setStateBoxCard((prevState) => ({
                        ...prevState,
                        quantityRedeem: value
                      }))
                    }}
                  />
                  <button
                    type='button'
                    className='boxcard__btn-select-quantity'
                    onClick={() => {
                      if (stateBoxCard.quantityRedeem === 9) return
                      if (stateBoxCard.quantityRedeem >= remainingItems) return
                      setStateBoxCard((prevState) => ({
                        ...prevState,
                        quantityRedeem: quantityRedeem + 1
                      }))
                    }}
                  >
                    {'>'}
                  </button>
                </div>
                <span>Minimo 1, Máximo 9.</span>
                <div>
                  <button type='submit' className='button green'>
                    Canjear
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalRedeem
