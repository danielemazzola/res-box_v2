export const initStateComment = {
  partner: {},
  comments: []
}

export const stateComment = (state, action) => {
  switch (action.type) {
    case 'SET_PARTNER':
      return { ...state, partner: action.payload }
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload }
    default:
      return state
  }
}
