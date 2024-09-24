import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth/AuthContext'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import { uploadImage } from '../../reducer/auth-reducer/auth.action'
import Modal from '../modal/Modal'
import { getDate } from '../../helpers/date'
import './PartnerCard.css'
import { sizeImg } from '../../helpers/sizeImg'

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
        if (partner._id === data.updatePartner._id) {
          return {
            ...partner,
            ...data.updatePartner
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
      payload: data.updatePartner
    })
  }

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
        />
      </div>
      <div className='partner__avatar'>
        <img
          src={partner.avatar}
          alt={partner.name}
          width='70'
          onClick={() => handleChangeImage({ avatar: true })}
        />
      </div>
      <div className='partner__title'>
        <p>Perfil de negocio</p>
      </div>
      <div className='partner__contain-information'>
        <div>
          <p className='partner__bg_p'>nombre</p>
          <p>{partner.name}</p>
        </div>
        <div>
          <p className='partner__bg_p'>CIF</p>
          <p>{partner.cif}</p>
        </div>
        <div>
          <p className='partner__bg_p'>email</p>
          <p>{partner.email}</p>
        </div>
        <div>
          <p className='partner__bg_p'>propietari@</p>
          <p>{partner.owner_name + ' ' + partner.owner_lastname}</p>
        </div>
        <div>
          <p className='partner__bg_p'>Dirección</p>
          <p>{partner.city + ', ' + partner.address}</p>
        </div>
        <div>
          <p className='partner__bg_p'>Usuarios vinculados</p>
          {partner.users?.map((user, index) => (
            <button
              className='partner__contain-btn-users waveEffect'
              key={index}
              onClick={() => handleUser(user)}
            >
              {user.name}
            </button>
          ))}
        </div>
        <div>
          <p className='partner__bg_p'>Cuenta creada</p>
          <p>{getDate(partner.createdAt)}</p>
        </div>
        <div>
          <p className={`${partner.confirmed ? 'green' : 'cancelled'}`}>
            {partner.confirmed ? 'Activo' : 'A la espera de confirmación'}
          </p>
        </div>
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
            <img src={userModal.avatar} alt={userModal.name} />
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
