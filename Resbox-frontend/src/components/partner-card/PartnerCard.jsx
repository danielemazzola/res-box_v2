import logo from '/images/logo.png'
import { getDate } from '../../helpers/date'
import './PartnerCard.css'
import Modal from '../modal/Modal'

const PartnerCard = ({ array }) => {
  console.log(array)

  return (
    <div className='partner__container fadeIn'>
      <div className='partner__title'>
        <p>Perfil de negocio</p>
      </div>
      <div className='partner__banner'>
        <img src={array.banner} alt={array.name} width='250' />
      </div>
      <div className='partner__avatar'>
        <img src={array.avatar} alt={array.name} width='50' />
      </div>
      <ul>
        <li>
          <p>nombre</p>
          {array.name}
        </li>
        <li>
          <p>email</p>
          {array.email}
        </li>
        <li>
          <p>CIF</p>
          {array.cif}
        </li>
        <li>
          <p>de</p>
          {array.owner_name + ' ' + array.owner_lastname}
        </li>
        <li>
          <p>Dirección</p>
          {array.country + ', ' + array.address}
        </li>
        <li>
          <p>Usuarios vinculados</p>
          {array.users?.map((user, index) => (
            <button key={index}>{user.name}</button>
          ))}
        </li>
        <li>
          <p>Cuenta creada</p>
          {getDate(array.createdAt)}
        </li>
      </ul>
      <Modal></Modal>
      {/**isModalOpen={} handleCloseModal={} */}

      <div className='partner__img-container'>
        <img src={logo} alt='Logo Res-Box' className='waveEffect' />
      </div>
    </div>
  )
}

export default PartnerCard
