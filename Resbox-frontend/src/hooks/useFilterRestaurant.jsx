const useFilterRestaurant = (searchTerm, arrayPartners) => {
  const filteredResults = arrayPartners.filter((element) => {
    const nameMatch = element.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const addressMatch = element.address
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return nameMatch || addressMatch
  })
  return filteredResults
}

export default useFilterRestaurant
