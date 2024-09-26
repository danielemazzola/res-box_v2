import { useContext } from 'react'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { Link } from 'react-router-dom'

export const NavOptions = ({ setShowMenu, showMenu }) => {
  const {
    stateIsAuth: { user }
  } = useContext(ReducersContext)
  const arrayNavOptions = [
    {
      route: './',
      title: 'Inicio'
    },
    {
      route: 'dashboard',
      title: 'Panel de Control'
    },
    {
      route: 'my-boxes',
      title: 'Mis Boxes'
    },
    {
      route: 'promo-box',
      title: 'Promo - Box'
    },
    user.roles.includes('partner') && {
      route: 'operations',
      title:'Mis Operaciones'
    },
    !user.roles.includes('partner') && {
      route: 'partner',
      title: 'Quiero ser Partner'
    }
  ].filter(Boolean)

  return (
    <>
      {arrayNavOptions?.map((val, index) => (
        <li key={index} className={`img-show`}>
          <Link to={val.route}>
            <button
              className='z-index-1000 button'
              onClick={() => setShowMenu(!showMenu)}
            >
              {val.title}
            </button>
          </Link>
        </li>
      ))}
    </>
  )
}
