import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth/AuthContext'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import { uploadImage } from '../../reducer/auth-reducer/auth.action'
import Modal from '../modal/Modal'
import { getDate } from '../../helpers/date'
import { sizeImg } from '../../helpers/sizeImg'
import './PartnerCard.css'
import like from '/images/like.png'
import heart from '/images/heart.png'
import { arrInfoPartner } from './helpers'

const PartnerCard = () => {
  const [userModal, setUserModal] = useState({})
  const [toogleModal, setToogleModal] = useState(false)
  const { fileBannerRef, fileAvatarRef, refPartnerInfo } =
    useContext(ScrollRefContext)
  const { API_URL, token } = useContext(AuthContext)
  const {
    dispatchLoader,
    dispatchToast,
    dispatchAuth,
    dispatchPartners,
    statePartners: { partners },
    stateIsAuth: { partner }
  } = useContext(ReducersContext)
  const handleUser = (user) => {
    setUserModal(user)
    setToogleModal(true)
  }

  const handleChangeImage = ({ banner = false, avatar = false }) => {
    if (banner) {
      if (fileBannerRef.current) fileBannerRef.current.click()
      else return
    }
    if (avatar) {
      if (fileAvatarRef.current) fileAvatarRef.current.click()
      else return
    }
  }

  const handleImageChangeInput = async (
    event,
    { banner = false, avatar = false }
  ) => {
    const file = event.target.files[0]
    const size = sizeImg(file)
    if (file && !size) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: {
          msg: 'El archivo es demasiado grande. El tamaño máximo es 5MB',
          error: true
        }
      })
      return
    }
    const formData = new FormData()
    if (banner) {
      formData.append('banner', file)
    }
    if (avatar) {
      formData.append('avatar', file)
    }
    const { data } = await uploadImage(
      token,
      formData,
      avatar ? API_URL.partner_avatar : API_URL.partner_banner,
      dispatchLoader,
      dispatchToast
    )
    if (partners.length > 0) {
      const updatePartner = partners.map((partner) => {
        if (partner._id === data.getPartner._id) {
          return {
            ...partner,
            ...data.getPartner
          }
        }
        return partner
      })
      dispatchPartners({
        type: 'SET_PARTNERS',
        payload: updatePartner
      })
    }
    dispatchAuth({
      type: 'SET_PARTNER',
      payload: data.getPartner
    })
  }
  const [infoPartner, setInfoPartner] = useState(
    () => arrInfoPartner(partner) || []
  )

  return (
    <div ref={refPartnerInfo} className='partner__container fadeIn'>
      <div className='partner__banner'>
        <form>
          <input
            ref={fileBannerRef}
            type='file'
            accept='.png, .jpeg, .jpg, .gif'
            style={{ display: 'none' }}
            onChange={(event) =>
              handleImageChangeInput(event, { banner: true })
            }
          />
          <input
            ref={fileAvatarRef}
            type='file'
            accept='.png, .jpeg, .jpg, .gif'
            style={{ display: 'none' }}
            onChange={(event) =>
              handleImageChangeInput(event, { avatar: true })
            }
          />
        </form>
        <img
          src={partner.banner}
          alt={partner.name}
          onClick={() => handleChangeImage({ banner: true })}
          loading='lazy'
        />
      </div>
      <div className='partner__avatar'>
        <img
          src={partner.avatar}
          alt={partner.name}
          width='70'
          onClick={() => handleChangeImage({ avatar: true })}
          loading='lazy'
        />
      </div>
      <div className='partner__title'>
        <p>Perfil de negocio</p>
      </div>
      <div className='partner__contain-information'>
        {infoPartner?.map((info, index) => (
          <div key={index}>
            <p className='partner__bg_p'>{info.key}</p>
            {info.key.includes('Usuarios vinculados') ? (
              info?.value?.map((user, index) => (
                <button
                  key={index}
                  className='partner__contain-btn-users waveEffect'
                  onClick={() => handleUser(user)}
                >
                  {user.name}
                </button>
              ))
            ) : info.key.includes('Estado') ? (
              <p
                className={`partner__state ${
                  info.value.includes('ACTIVO') ? 'green' : 'cancelled'
                }`}
              >
                {info.value}
              </p>
            ) : info.key.includes('Likes') ? (
              <>
                <img alt='likes' loading='lazy' width='20' src={info.value} />
                <span>({info.value_text})</span>
              </>
            ) : (
              <p>{info.value}</p>
            )}
          </div>
        ))}
      </div>
      <Modal
        isModalOpen={toogleModal}
        handleCloseModal={() => {
          setToogleModal(!toogleModal)
          setTimeout(() => {
            setUserModal({})
          }, 500)
        }}
      >
        <div className='partner__modal-card'>
          <div>
            <img src={userModal.avatar} alt={userModal.name} loading='lazy' />
          </div>
          <div>
            <div>
              <p>Nombre</p>
              <p>{userModal.name + ' ' + userModal.lastname}</p>
            </div>
            <div>
              <p>E-mail</p>
              <p>{userModal.email}</p>
            </div>
          </div>
          <div className='partner__contain-roles'>
            <p>
              Roles:{' '}
              {userModal.roles?.map((role, index) => (
                <span key={index}>{role}</span>
              ))}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PartnerCard
