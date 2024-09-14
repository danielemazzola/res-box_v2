export const initState = {
  filterState: false,
  partners: [],
  arrayFilterPartners: [],
  arrayFilterPartnersSearch: []
}
export const state = (state, action) => {
  switch (action.type) {
    case 'SET_PARTNERS':
      return { ...state, partners: action.payload }
    case 'SET_FILTER_STATE_TRUE':
      return { ...state, filterState: true }
    case 'SET_FILTER_STATE_FALSE':
      return { ...state, filterState: false }
    case 'SET_FILTER_PARTNERS':
      return { ...state, arrayFilterPartners: action.payload }
    case 'SET_FILTER_SEARCH':
      return { ...state, arrayFilterPartnersSearch: action.payload }

    default:
      return state
  }
}
