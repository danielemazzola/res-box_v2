export const initStateAuth = {
  user: {}
}

export const stateAuth = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    default:
      return state
  }
}
