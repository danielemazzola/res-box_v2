export const initStateAuth = {
  user: {},
  partner: {},
  isAuth: false
}

export const stateAuth = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_PARTNER':
      return { ...state, partner: action.payload }
    case 'SET_AUTH_TRUE':
      return { ...state, isAuth: true }
    case 'SET_AUTH_FALSE':
      return { ...state, isAuth: false }
    default:
      return state
  }
}
