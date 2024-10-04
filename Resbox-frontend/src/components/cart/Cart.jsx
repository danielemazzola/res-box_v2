import { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [itemsQuantity, setItemsQuantity] = useState(0)
  const {
    statePromoBoxes: { cart }
  } = useContext(ReducersContext)

  useEffect(() => {
    setItemsQuantity(() => cart.reduce((acc, item) => acc + item.quantity, 0))
  }, [cart])

  return (
    <div className='cart__container fadeIn'>
      <button>
        <Link to='../cart-items'>
          🛒
          <p className='cart__quantity-number'>{itemsQuantity}</p>
        </Link>
      </button>
    </div>
  )
}

export default Cart
