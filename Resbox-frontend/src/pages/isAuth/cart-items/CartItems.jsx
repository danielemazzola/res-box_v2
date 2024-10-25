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
import { buyBox } from '../../../reducer/invoice-reducer/invoice.action'
import PromoBox from '../promo-box/PromoBox'

const CartItems = () => {
  const [amount, setAmount] = useState(0)
  const navigate = useNavigate()
  const {
    dispatchToast,
    dispatchAuth,
    dispatchLoader,
    statePromoBoxes: { cart },
    dispatchPromoBoxes,
    stateIsAuth: { user },
    dispatchInvoice
  } = useContext(ReducersContext)
  const scrollToRef = useScrollToRef()
  const { sectionRefCartItems } = useContext(ScrollRefContext)

  const { token } = useContext(AuthContext)

  useEffect(() => {
    setTimeout(() => {
      scrollToRef(sectionRefCartItems)
    }, 500)
  }, [])

  useEffect(() => {
    setAmount(() =>
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    )
  }, [cart])

  const handlePayCart = async () => {
    const urlApi = `${import.meta.env.VITE_URL_API}/box/buy-box-cart`
    try {
      const { response, data } = await buyBox(
        dispatchLoader,
        urlApi,
        token,
        cart,
        dispatchToast,
        dispatchAuth,
        dispatchInvoice,
        dispatchPromoBoxes
      )
      if (response.status === 201) {
        confetti({
          particleCount: 250,
          spread: 170,
          origin: { y: 1.3 }
        })
        navigate(`../invoice/${data.invoice._id}`)
      }
    } catch (error) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: error.message, error: true }
      })
    }
  }

  return (
    <div ref={sectionRefCartItems} className='cart-items__container'>
      <div className='fadeIn'>
        <h3>Mi 🛒 de compras</h3>
        {cart.length <= 0 ? (
          <>
            <p className='fadeIn'>
              Actualmente no hay productos en tu cesta, pero dale un vistazo a
              nuestras promociones:
            </p>
          </>
        ) : (
          <>
            <p>
              Actualmente hay <strong>"{cart.length}"</strong>{' '}
              {cart.length === 1 ? 'articulo' : 'articulos'} en tu cesta:
            </p>
            {cart.length > 0 && (
              <button className='button green' onClick={handlePayCart}>
                Pagar ahora: {formatCash(amount)}
              </button>
            )}
            <p>¿Quieres añadir MÁS articulos?</p>
          </>
        )}
        {amount !== 0 && (
          <div className='cartitems__contentbtn-actions fadeIn'>
            <Link to='../promo-box'>
              <button
                className='button'
                style={{ backgroundColor: 'var(--rb-bg-options) !important' }}
              >
                PROMOCIONES DESTACADAS
              </button>
            </Link>
          </div>
        )}
        {amount === 0 && <div className='fadeIn' onClick={() => scrollToRef(sectionRefCartItems)}><PromoBox /></div>}
      </div>
      <div>
        {cart.map((item, index) => (
          <PromoBoxCard key={index} box={item} />
        ))}
      </div>
      {cart.length > 0 && (
        <button
          className='more-info'
          style={{ backgroundColor: 'white', padding: '3px' }}
          onClick={() => {
            dispatchPromoBoxes({ type: 'SET_DELETE_CART' })
            scrollToRef(sectionRefCartItems)
          }}
        >
          Vaciar mi cesta
        </button>
      )}
      <div className='cart-items__content-img'>
        <img alt='logo res-box' loading='lazy' src={logo} />
      </div>
    </div>
  )
}

export default CartItems
