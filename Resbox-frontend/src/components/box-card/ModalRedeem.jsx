import React from 'react'
import Modal from '../modal/Modal'
import { handleCloseModal } from './helpers'
import logo from '/images/logo.png'

const ModalRedeem = ({
  modalOpen,
  box,
  remainingItems,
  quantityRedeem,
  setModalState,
  setQuantityRedeem,
  secureTokenRedeem,
  setSecureTokenRedeem,
  handleSubmit
}) => {
  return (
    <>
      <Modal
        isModalOpen={modalOpen}
        handleCloseModal={() =>
          handleCloseModal(
            setModalState,
            setQuantityRedeem,
            setSecureTokenRedeem
          )
        }
      >
        <div className='boxcard__container-form'>
          <div className='boxcard__contain-form'>
            <div className='boxcard__container-img-form'>
              <div className='boxcard__contain-img-title'>
                <img src={logo} alt='Logo Res-Box' className='waveEffect' />
                <h1>{box.box.name_box}</h1>
              </div>
              <div className='boxcard__target-description-form boxcard__center'>
                <p>Canjear</p>
                <p>{quantityRedeem}</p>
              </div>
            </div>
            <p>Restantes: {remainingItems} (unid.)</p>
            {secureTokenRedeem !== 0 ? (
              <div className='boxcard__secureTokenRedeem-container'>
                <p>"Muestra este código en tu establecimiento favorito"</p>
                <p className='boxcard__secureTokenRedeem'>
                  {secureTokenRedeem}
                </p>
              </div>
            ) : (
              <form
                className='boxcard__form'
                onSubmit={(e) => handleSubmit(e, box)}
              >
                <div>
                  <label>Cantidad a canjear (max:10)</label>
                  <input
                    type='number'
                    name='quantity'
                    min={1}
                    max={9}
                    value={quantityRedeem}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10)
                      if (value > box.remainingItems) {
                        return alert(
                          'No puedes agregar más unidades de las que puedes cangear.'
                        )
                      }
                      if (value >= 1 && value <= 9) {
                        setQuantityRedeem(value)
                      }
                    }}
                  />
                </div>
                <div>
                  <button type='submit' className='button green'>
                    Canjear
                  </button>
                  <button
                    type='button'
                    className='button'
                    onClick={() => setModalState(false)}
                  >
                    Cerrar
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
