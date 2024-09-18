export const initStatePromoBox = {
  boxes:[]
}

export const statePromoBox = (state, action) => {
  switch (action.type) {
    case 'SET_BOXES':
      return { ...state, boxes:action.payload}  
    default:
      return state
  }
}
