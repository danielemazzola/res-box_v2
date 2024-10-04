export const initStatePromoBox = {
  boxes: [],
  cart: JSON.parse(localStorage.getItem('CART_RES-BOX')) || []
}

export const statePromoBox = (state, action) => {
  switch (action.type) {
    case 'SET_BOXES':
      return { ...state, boxes: action.payload }
    case 'SET_ADD_CART':
      const existingBoxIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      )
      let updatedCart
      if (existingBoxIndex !== -1) {
        updatedCart = state.cart.map((item, index) =>
          index === existingBoxIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        const newBox = { ...action.payload, quantity: 1 }
        updatedCart = [...state.cart, newBox]
      }
      localStorage.setItem('CART_RES-BOX', JSON.stringify(updatedCart))
      return { ...state, cart: updatedCart }
    case 'SET_REMOVE_CART': {
      const existingBoxIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      )
      let updatedCart
      if (existingBoxIndex !== -1) {
        updatedCart = state.cart
          .map((item, index) =>
            index === existingBoxIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
      } else {
        updatedCart = [...state.cart]
      }

      localStorage.setItem('CART_RES-BOX', JSON.stringify(updatedCart))
      return { ...state, cart: updatedCart }
    }
    case 'SET_DELETE_CART': {
      localStorage.removeItem('CART_RES-BOX')
      return { ...state, cart: [] }
    }

    default:
      return state
  }
}
