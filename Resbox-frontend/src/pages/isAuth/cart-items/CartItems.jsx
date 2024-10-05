import { useContext, useEffect, useState } from 'react'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import confetti from 'canvas-confetti'
import './CartItems.css'
import logo from '/images/logo.png'
import PromoBoxCard from '../../../components/promo-box-card/PromoBoxCard'
import { Link, useNavigate } from 'react-router-dom'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import useScrollToRef from '../../../hooks/useScrollToRef'
import { formatCash } from '../operations/herlpers'
import { AuthContext } from '../../../context/auth/AuthContext'

const CartItems = () => {
  const [amount, setAmount] = useState(0)
  const navigate = useNavigate()
  const {
    dispatchToast,
    dispatchAuth,
    dispatchLoader,
    statePromoBoxes: { cart },
    dispatchPromoBoxes,
    stateIsAuth: { user }
  } = useContext(ReducersContext)
  const scrollToRef = useScrollToRef()
  const { sectionRefCartItems } = useContext(ScrollRefContext)

  const { token } = useContext(AuthContext)

  useEffect(() => {
    scrollToRef(sectionRefCartItems)
  }, [])

  useEffect(() => {
    setAmount(() =>
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    )
  }, [cart])

  const handlePayCart = async () => {
    try {
      dispatchLoader({ type: 'SET_LOAD_TRUE' })
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/box/buy-box-cart`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ boxes: cart })
        }
      )
      const data = await response.json()
      if (response.status !== 201) {
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: data.message, error: true }
        })
        return
      }
      dispatchAuth({ type: 'SET_USER', payload: data.updatedUser })
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: data.message, error: false }
      })
      dispatchPromoBoxes({ type: 'SET_DELETE_CART' })
      confetti({
        particleCount: 250,
        spread: 170,
        origin: { y: 1.3 }
      })
      dispatchPromoBoxes({ type: 'SET_BOXES', payload: data.boxes })
      navigate('../my-boxes')
    } catch (error) {
    } finally {
      dispatchLoader({ type: 'SET_LOAD_FALSE' })
    }
  }

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
            <p>
              Actualmente hay <strong>"{cart.length}"</strong>{' '}
              {cart.length === 1 ? 'articulo' : 'articulos'} en tu cesta:
            </p>
            <p>¿Quieres añadir MÁS articulos?</p>
          </>
        )}
        <div className='cartitems__contentbtn-actions'>
          {cart.length > 0 && (
            <button className='' onClick={handlePayCart}>
              Pagar ahora: {formatCash(amount)}
            </button>
          )}
          <Link to='../promo-box'>
            <button className='button green'>PROMOCIONES DESTACADAS</button>
          </Link>
          {cart.length > 0 && (
            <button
              className=''
              style={{
                backgroundColor: 'var(--rb-bg-options)',
                color: 'white'
              }}
              onClick={() => dispatchPromoBoxes({ type: 'SET_DELETE_CART' })}
            >
              Vaciar mi cesta
            </button>
          )}
        </div>
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
