import logo from '/images/logo.png'
import { getDate } from '../../helpers/date'
import './PartnerCard.css'
import Modal from '../modal/Modal'

const PartnerCard = ({ array }) => {
  console.log(array)

  return (
    <div className='partner__container fadeIn'>
      <div className='partner__banner'>
        <img src={array.banner} alt={array.name} />
      </div>
      <div className='partner__avatar'>
        <img src={array.avatar} alt={array.name} width='70' />
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
            <button key={index}>{user.name}</button>
          ))}
        </div>
        <div>
          <p>Cuenta creada</p>
          <p>{getDate(array.createdAt)}</p>
        </div>
      </div>
      <Modal></Modal>
      {/**isModalOpen={} handleCloseModal={} */}

      <div className='partner__img-container'>
        <img src={logo} alt='Logo Res-Box' className='waveEffect' />
      </div>
    </div>
  )
}

export default PartnerCard
