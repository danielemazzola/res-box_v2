import { useContext } from 'react'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import favorite from '/images/like.png'
import carrito from '/images/carrito.png'
import box from '/images/caja.webp'
import notificaciones from '/images/notificaciones.png'
import './BarNav.css'
import { Link } from 'react-router-dom'
import CartItems from '../../pages/isAuth/cart-items/CartItems'
import Cart from '../cart/Cart'

const BarNav = () => {
  const {
    stateIsAuth: { user }
  } = useContext(ReducersContext)
  return (
    <div className='bar-nav-footer__container filter fadeIn'>
      <Link className=''>
        <img src={favorite} alt='Mis Favoritos' />
      </Link>
      <Link to='/my-boxes'>
        <img src={box} alt='Canjear' />
      </Link>
      <Link to='/dashboard'>
        <img src={user.avatar} alt={user.name} />
      </Link>
      <Link>
        <img src={notificaciones} alt='Notificaciones' />
      </Link>
      <Cart />
    </div>
  )
}

export default BarNav
