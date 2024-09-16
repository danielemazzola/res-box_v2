import logo from '/images/logo.png'
import './ProfileCard.css'
import { getDate } from '../../helpers/date'

const ProfileCard = ({ array }) => {
  return (
    <div className='profile__container fadeIn'>
      <div className='profile__title'>
        <p>Información de perfil</p>
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

      <div className='profile__img-container'>
        <img src={logo} alt='Logo Res-Box' className='waveEffect' />
      </div>
    </div>
  )
}

export default ProfileCard
