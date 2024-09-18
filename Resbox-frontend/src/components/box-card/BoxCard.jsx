import { Fragment, useContext, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import Modal from '../modal/Modal'
import {
  containInformation,
  getRandomBackgroundColor,
  handleCloseModal
} from './helpers'
import { getDate } from '../../helpers/date'
import { fetchNewOperation } from '../../services/fetch-operation/fetchOperation'
import './BoxCard.css'
import logo from '/images/logo.png'
import { AuthContext } from '../../context/auth/AuthContext'
import ModalRedeem from './ModalRedeem'

const BoxCard = ({ box }) => {
  const [modalState, setModalState] = useState(false)
  const [quantityRedeem, setQuantityRedeem] = useState(1)
  const [secureTokenRedeem, setSecureTokenRedeem] = useState(0)
  const [remainingItems, setRemainingItems] = useState(box.remainingItems)
  const { dispatchAuth, dispatchLoader, dispatchToast } =
    useContext(ReducersContext)
  const { urlImageChange } = useContext(AuthContext)
  const backgroundColor = useMemo(() => getRandomBackgroundColor(), [])
  const newArrayInfoBox = containInformation(box)

  const handleSubmit = async (e, box) => {
    e.preventDefault()
    const token = localStorage.getItem('SECURE_CODE_RESBOX')
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { data } = await fetchNewOperation(
      token,
      urlImageChange.user_operation,
      box.box._id,
      'POST',
      quantityRedeem,
      dispatchLoader,
      dispatchToast
    )
    setSecureTokenRedeem(data.token)
    setRemainingItems((prev) => prev - quantityRedeem)
    confetti({
      particleCount: 250,
      spread: 170,
      origin: { y: 1.3 }
    })
  }

  const canvas = document.querySelector('canvas')
  if (canvas) {
    canvas.style.zIndex = '9999'
    canvas.style.position = 'fixed'
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
        const newValue = data.updatedUser.purchasedBoxes?.filter(
          (box) => box.box._id === idBox
        )
        console.log(newValue)
        setRemainingItems(newValue[0].remainingItems)
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
                    <p key={index} className='boxcar__bg-white'>
                      {partner}
                    </p>
                  ))
              )}
            </div>
          ))}
        </div>
        <div className='boxcard__title-active'>
          <p className='boxcard__description-active'>
            Actvos: {remainingItems}
          </p>
        </div>
        <div className='boxcard__container-btn'>
          <div>
            {remainingItems > 0 && (
              <button
                className='button'
                style={{ backgroundColor: 'var(--rb-bg-options)!important' }}
                onClick={() => setModalState(true)}
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

      <ModalRedeem
        modalOpen={modalState}
        box={box}
        remainingItems={remainingItems}
        quantityRedeem={quantityRedeem}
        setModalState={setModalState}
        setQuantityRedeem={setQuantityRedeem}
        secureTokenRedeem={secureTokenRedeem}
        setSecureTokenRedeem={setSecureTokenRedeem}
        handleSubmit={handleSubmit}
      />
    </>
  )
}

export default BoxCard
