import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth/AuthContext'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import { uploadImage } from '../../reducer/auth-reducer/auth.action'
import Modal from '../modal/Modal'
import { getDate } from '../../helpers/date'
import './PartnerCard.css'

const PartnerCard = ({ array }) => {
  const [userModal, setUserModal] = useState({})
  const [toogleModal, setToogleModal] = useState(false)
  const [selectedImageBanner, setSelectedImageBanner] = useState(array.banner)
  const [selectedImageAvatar, setSelectedImageAvatar] = useState(array.avatar)
  const { fileBannerRef, fileAvatarRef } = useContext(ScrollRefContext)
  const { API_URL, token } = useContext(AuthContext)
  const { dispatchLoader, dispatchToast, dispatchAuth } =
    useContext(ReducersContext)
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
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      alert('El archivo es demasiado grande. El tamaño máximo es 5MB.')
      return
    }
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      const formData = new FormData()
      if (banner) {
        formData.append('banner', file)
        setSelectedImageBanner(imageUrl)
      }
      if (avatar) {
        formData.append('avatar', file)
        setSelectedImageAvatar(imageUrl)
      }
      const { data } = await uploadImage(
        token,
        formData,
        avatar ? API_URL.partner_avatar : API_URL.partner_banner,
        dispatchLoader,
        dispatchToast
      )
      dispatchAuth({
        type: 'SET_PARTNER',
        payload: avatar ? data.avatar : data.banner
      })
    }
  }

  return (
    <div className='partner__container fadeIn'>
      <div className='partner__banner'>
        <form>
          <input
            id='changeImage'
            ref={fileBannerRef}
            type='file'
            accept='.png, .jpeg, .jpg, .gif'
            style={{ display: 'none' }}
            onChange={(event) =>
              handleImageChangeInput(event, { banner: true })
            }
          />
          <input
            id='changeImage'
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
          src={selectedImageBanner}
          alt={array.name}
          onClick={() => handleChangeImage({ banner: true })}
        />
      </div>
      <div className='partner__avatar'>
        <img
          src={selectedImageAvatar}
          alt={array.name}
          width='70'
          onClick={() => handleChangeImage({ avatar: true })}
        />
      </div>
      <div className='partner__title'>
        <p>Perfil de negocio</p>
      </div>
      <div className='partner__contain-information'>
        <div>
          <p>nombre</p>
          <p>{array.name}</p>
        </div>
        <div>
          <p>CIF</p>
          <p>{array.cif}</p>
        </div>
        <div>
          <p>email</p>
          <p>{array.email}</p>
        </div>
        <div>
          <p>propietari@</p>
          <p>{array.owner_name + ' ' + array.owner_lastname}</p>
        </div>
        <div>
          <p>Dirección</p>
          <p>{array.country + ', ' + array.address}</p>
        </div>
        <div>
          <p>Usuarios vinculados</p>
          {array.users?.map((user, index) => (
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
          <p>Cuenta creada</p>
          <p>{getDate(array.createdAt)}</p>
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
          <img src={userModal.avatar} alt={userModal.name} />
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
