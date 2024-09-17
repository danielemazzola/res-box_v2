import { useContext, useMemo, useState } from 'react'
import { getDate } from '../../helpers/date'
import { getRandomBackgroundColor } from './helpers'
import Modal from '../modal/Modal'
import './BoxCard.css'
import logo from '/images/logo.png'
import { ReducersContext } from '../../context/reducers/ReducersContext'

const BoxCard = ({ box }) => {
  const [modalState, setModalState] = useState(false)
  const [quantityRedeem, setQuantityRedeem] = useState(1)
  const [secureTokenRedeem, setSecureTokenRedeem] = useState(0)
  const { dispatchLoader, dispatchToast } = useContext(ReducersContext)
  const [remainingItems, setRemainingItems] = useState(box.remainingItems)

  const handleSubmit = async (e, box) => {
    e.preventDefault()
    const token = localStorage.getItem('SECURE_CODE_RESBOX')
    try {
      dispatchLoader({ type: 'SET_LOAD_TRUE' })
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/operation/new-operation/${
          box.box._id
        }`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ consumed: quantityRedeem })
        }
      )
      const data = await response.json()
      if (response.status !== 201) {
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: `Error: ${data.message}`, error: true }
        })
      } else {
        setSecureTokenRedeem(data.token)
        setRemainingItems((prev) => prev - quantityRedeem)
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: 'Canje exitoso!', error: false }
        })
      }
    } catch (error) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: `Error: ${error.message}`, error: true }
      })
    } finally {
      setTimeout(() => {
        dispatchLoader({ type: 'SET_LOAD_FALSE' })
      }, 1500)
    }
  }

  const handleCloseModal = () => {
    setModalState(false)
    setTimeout(() => {
      setQuantityRedeem(1)
      setSecureTokenRedeem(0)
    }, 500)
  }

  const backgroundColor = useMemo(() => getRandomBackgroundColor(), [])

  return (
    <div className='boxcard__container fadeIn' style={{ backgroundColor }}>
      <div className='boxcard__title'>
        <p className='boxcard__description'>Box: {box.box.name_box}</p>
      </div>
      <div className='boxcard__contain-information'>
        <div>
          <p>Incluye:</p>
          <p className='boxcar__bg-white'>{box.box.items_included}</p>
        </div>
        <div>
          <p>Extra:</p>
          <p className='boxcar__bg-white'>{box.box.bonus_items}</p>
        </div>
        <div>
          <p>Precio:</p>
          <p className='boxcar__bg-white'>{box.box.price}€</p>
        </div>
        {box.id_partner_consumed.length > 0 && (
          <div>
            <p>Usado en:</p>
            {box.id_partner_consumed?.map((partner, index) => (
              <p key={index} className='boxcar__bg-white'>
                {partner.name}
              </p>
            ))}
          </div>
        )}
        <div>
          <p>Fecha adquirido:</p>
          <p className='boxcar__bg-white'>{getDate(box.box.createdAt)}</p>
        </div>
      </div>
      <div className='boxcard__title-active'>
        <p className='boxcard__description-active'>Actvos: {remainingItems}</p>
      </div>
      <div className='boxcard__container-btn'>
        <div>
          {box.remainingItems > 0 && (
            <>
              <button
                className='button'
                style={{ backgroundColor: 'var(--rb-bg-options)!important' }}
                onClick={() => setModalState(true)}
              >
                Canjear
              </button>
              <Modal
                isModalOpen={modalState}
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
                        />
                        <h1>{box.box.name}</h1>
                      </div>
                      <div className='boxcard__target-description-form boxcard__center'>
                        <p>Canjear</p>
                        <p>{quantityRedeem}</p>
                      </div>
                    </div>
                    <p>Restantes: {box.remainingItems} (unid.)</p>
                    {secureTokenRedeem !== 0 ? (
                      <div className='boxcard__secureTokenRedeem-container'>
                        <p>Muestra este codigo en tu negocio favorito</p>
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
          )}
          <button className='button'>Añadir más</button>
        </div>
      </div>
    </div>
  )
}

export default BoxCard
