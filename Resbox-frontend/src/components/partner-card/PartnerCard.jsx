import logo from '/images/logo.png'
import { getDate } from '../../helpers/date'
import './PartnerCard.css'

const PartnerCard = ({ array }) => {
  return (
    <div className='partner__container fadeIn'>
      <div className='partner__title'>
        <p>Perfil de negocio</p>
      </div>
      <ul>
        <li>
          <p>nombre</p>
          {array.name + ' ' + array.lastname}
        </li>
        <li>
          <p>email</p>
          {array.email}
        </li>
        <li>
          <p>Roles</p>
          {array.roles.map((el) => el).join(', ')}
        </li>
        <li>
          <p>Cuenta creada</p>
          {getDate(array.createdAt)}
        </li>
      </ul>

      <div className='partner__img-container'>
        <img src={logo} alt='Logo Res-Box' className='waveEffect' />
      </div>
    </div>
  )
}

export default PartnerCard
