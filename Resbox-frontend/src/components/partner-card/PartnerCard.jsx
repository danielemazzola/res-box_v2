import logo from '/images/logo.png'
import { getDate } from '../../helpers/date'
import './PartnerCard.css'
import Modal from '../modal/Modal'
import { useContext, useState } from 'react'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'

const PartnerCard = ({ array }) => {
  const [userModal, setUserModal] = useState({})
  const [toogleModal, setToogleModal] = useState(false)
  const [selectedImageBanner, setSelectedImageBanner] = useState(array.banner)
  const [selectedImageAvatar, setSelectedImageAvatar] = useState(array.avatar)
  const { fileBannerRef, fileAvatarRef } = useContext(ScrollRefContext)
  const handleUser = (user) => {
    setUserModal(user)
    setToogleModal(true)
  }

  const handleImageClickBanner = () => {
    if (fileBannerRef.current) {
      fileBannerRef.current.click()
    } else {
      return
    }
  }

  const handleImageChangeBanner = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImageBanner(imageUrl)
      //await uploadImage(file, dispatchLoader, dispatchToast, dispatchAuth)
    }
  }

  const handleImageClickAvatar = () => {
    if (fileAvatarRef.current) {
      fileAvatarRef.current.click()
    } else {
      return
    }
  }

  const handleImageChangeAvatar = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImageAvatar(imageUrl)
      //await uploadImage(file, dispatchLoader, dispatchToast, dispatchAuth)
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
            onChange={handleImageChangeBanner}
          />
        </form>
        <img
          src={selectedImageBanner}
          alt={array.name}
          onClick={handleImageClickBanner}
        />
      </div>
      <div className='partner__avatar'>
        <form>
          <input
            id='changeImage'
            ref={fileAvatarRef}
            type='file'
            accept='.png, .jpeg, .jpg, .gif'
            style={{ display: 'none' }}
            onChange={handleImageChangeAvatar}
          />
        </form>
        <img
          src={selectedImageAvatar}
          alt={array.name}
          width='70'
          onClick={handleImageClickAvatar}
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
            <button key={index} onClick={() => handleUser(user)}>
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
        </div>
      </Modal>
    </div>
  )
}

export default PartnerCard
