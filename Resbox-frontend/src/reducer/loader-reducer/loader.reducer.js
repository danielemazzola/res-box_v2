export const initStateLoader = {
  load: false
}

export const stateLoad = (state, action) => {
  switch (action.type) {
    case 'SET_LOAD_TRUE':
      return { ...state, load: true }
    case 'SET_LOAD_FALSE':
      return { ...state, load: false }

    default:
      return state
  }
}
