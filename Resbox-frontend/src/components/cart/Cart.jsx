import { useContext, useState } from 'react'
import './Cart.css'
import { ReducersContext } from '../../context/reducers/ReducersContext'

const Cart = () => {
  const {
    statePromoBoxes: { cart }
  } = useContext(ReducersContext)

  const [itemsQuantity, setItemsQuantity] = useState(
    cart.reduce((acc, item) => acc + item.quantity, 0) || 0
  )

  return (
    <div className='cart__container fadeIn'>
      <button>
        🛒
        <p className='cart__quantity-number'>{itemsQuantity}</p>
      </button>
    </div>
  )
}

export default Cart
