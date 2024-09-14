export const getFilterPartners = (
  country,
  partners,
  dispatchPartners,
  arrayFilterPartners
) => {
  dispatchPartners({ type: 'SET_FILTER_SEARCH', payload: [] })
  if (arrayFilterPartners.length > 0) {
    dispatchPartners({ type: 'SET_FILTER_STATE_FALSE' })
    setTimeout(() => {
      const filtered = handleFilterCountry(country, partners)
      dispatchPartners({ type: 'SET_FILTER_PARTNERS', payload: filtered })
      dispatchPartners({ type: 'SET_FILTER_STATE_TRUE' })
    }, 300)
  } else {
    const filtered = handleFilterCountry(country, partners)
    dispatchPartners({ type: 'SET_FILTER_PARTNERS', payload: filtered })
    dispatchPartners({ type: 'SET_FILTER_STATE_TRUE' })
  }
}
const handleFilterCountry = (country, partners) => {
  let newArrayPartners = partners
  const getFilterPartnersCountry = newArrayPartners.filter(
    (partner) => partner.country === country
  )
  return getFilterPartnersCountry
}
export const handleSearchPartner = (
  e,
  setSearchTerm,
  searchTerm,
  dispatchPartners,
  useFilterRestaurant,
  arrayFilterPartners
) => {
  const term = e.target.value
  setSearchTerm(term)
  if (term.length === 0) {
    dispatchPartners({ type: 'SET_FILTER_SEARCH', payload: [] })
  } else {
    dispatchPartners({
      type: 'SET_FILTER_SEARCH',
      payload: useFilterRestaurant(searchTerm, arrayFilterPartners)
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
