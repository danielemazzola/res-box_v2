import logo from '/images/logo.png'
import './ProfileCard.css'
import { getDate } from '../../helpers/date'

const ProfileCard = ({ array }) => {
  return (
    <div className='profile__container fadeIn'>
      <div className='profile__title'>
        <p>Información de perfil</p>
      </div>
      <div className='profile__contain-information'>
        <div>
          <p>nombre</p>
          <p>{array.name + ' ' + array.lastname}</p>
        </div>
        <div>
          <p>email</p>
          <p>{array.email}</p>
        </div>
        <div>
          <p>Roles</p>
          <p>{array.roles.map((el) => el).join(', ')}</p>
        </div>
        <div>
          <p>Cuenta creada</p>
          <p>{getDate(array.createdAt)}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
