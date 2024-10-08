import { fetchGetOperations } from '../../services/fetch-partner/fetchPartners'

export const getFilterPartners = (
  city,
  partners,
  dispatchPartners,
  arrayFilterPartners
) => {
  dispatchPartners({ type: 'SET_FILTER_SEARCH', payload: [] })
  if (arrayFilterPartners.length > 0) {
    dispatchPartners({ type: 'SET_FILTER_STATE_FALSE' })
    setTimeout(() => {
      const filtered = handleFiltercity(city, partners)
      dispatchPartners({ type: 'SET_FILTER_PARTNERS', payload: filtered })
      dispatchPartners({ type: 'SET_FILTER_STATE_TRUE' })
    }, 300)
  } else {
    const filtered = handleFiltercity(city, partners)
    dispatchPartners({ type: 'SET_FILTER_PARTNERS', payload: filtered })
    dispatchPartners({ type: 'SET_FILTER_STATE_TRUE' })
  }
}
const handleFiltercity = (city, partners) => {
  let newArrayPartners = partners
  const getFilterPartnerscity = newArrayPartners.filter(
    (partner) => partner.city === city
  )
  return getFilterPartnerscity
}

export const handleSearchPartner = (
  e,
  setSearchTerm,
  searchTerm,
  dispatchPartners,
  useFilterPartner,
  arrayFilterPartners
) => {
  const term = e.target.value
  setSearchTerm(term)
  if (term.length === 0) {
    dispatchPartners({ type: 'SET_FILTER_SEARCH', payload: [] })
  } else {
    dispatchPartners({
      type: 'SET_FILTER_SEARCH',
      payload: useFilterPartner(searchTerm, arrayFilterPartners)
    })
  }
}

export const handleCloseFilter = (
  dispatchPartners,
  scrollToRef,
  refPartnersSection
) => {
  dispatchPartners({ type: 'SET_FILTER_STATE_FALSE' })
  dispatchPartners({ type: 'SET_FILTER_PARTNERS', payload: [] })
  scrollToRef(refPartnersSection)
}

export const getOperationsByPartner = async (
  token,
  url,
  dispatchToast,
  dispatchLoader,
  dispatchPartners
) => {
  try {
    dispatchLoader({ type: 'SET_LOAD_TRUE' })
    const { response, data } = await fetchGetOperations(token, url)
    if (response.status !== 200) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: data.message, error: true }
      })
    } else {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: data.message, error: false }
      })
      dispatchPartners({ type: 'SET_OPERATIONS', payload: data.operations })
    }
  } catch (error) {
    dispatchToast({
      type: 'ADD_NOTIFICATION',
      payload: { msg: error.message, error: true }
    })
  } finally {
    dispatchLoader({ type: 'SET_LOAD_FALSE' })
  }
}
