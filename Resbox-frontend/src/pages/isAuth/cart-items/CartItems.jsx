import { useContext, useEffect } from 'react'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import './CartItems.css'
import logo from '/images/logo.png'
import PromoBoxCard from '../../../components/promo-box-card/PromoBoxCard'
import { Link } from 'react-router-dom'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import useScrollToRef from '../../../hooks/useScrollToRef'

const CartItems = () => {
  const {
    statePromoBoxes: { cart },
    stateIsAuth: { user }
  } = useContext(ReducersContext)
  const scrollToRef = useScrollToRef()
  const { sectionRefCartItems } = useContext(ScrollRefContext)
  useEffect(() => {
    scrollToRef(sectionRefCartItems)
  }, [])
  console.log(cart)
  console.log(user)

  return (
    <div ref={sectionRefCartItems} className='cart-items__container'>
      <div>
        <h3>Mi 🛒 de compras</h3>
        {cart.length <= 0 ? (
          <>
            <p>
              Actualmente no hay productos en tu cesta, pero te dejaremos un
              enlace rapido para veas los BOX más comprados.
            </p>
          </>
        ) : (
          <>
            <p>Actualmente hay {cart.length} articulos en tu cesta:</p>
            <p>¿Quieres añadir MÁS articulos?</p>
          </>
        )}
        <Link to='../promo-box'>
          <button className='button green'>PROMOCIONES DESTACADAS</button>
        </Link>
      </div>
      <div>
        {cart.map((item, index) => (
          <PromoBoxCard key={index} box={item} />
        ))}
      </div>
      <div className='cart-items__content-img'>
        <img alt='logo res-box' loading='lazy' src={logo} />
      </div>
    </div>
  )
}

export default CartItems
