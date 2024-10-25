import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { cartQuantity } from './helper'
import carrito from '/images/carrito.png'
import './Cart.css'

const Cart = () => {
  const [itemsQuantity, setItemsQuantity] = useState(0)
  const {
    statePromoBoxes: { cart }
  } = useContext(ReducersContext)

  useEffect(() => {
    setItemsQuantity(() => cartQuantity(cart))
  }, [cart])

  return (
    <Link to='../cart-items' className='content_cart__quantity-number'>
      <img src={carrito} alt='Carrito de compras' />
      {itemsQuantity > 0 && <p className='fadeIn'>{itemsQuantity}</p>}
    </Link>
  )
}

export default Cart
