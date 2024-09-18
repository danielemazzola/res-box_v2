const useFilterRestaurant = (searchTerm, arrayPartners) => {
  const filteredResults = arrayPartners.filter((element) => {
    let addressMatch
    const nameMatch = element.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    addressMatch = element.address
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return nameMatch || addressMatch
  })
  return filteredResults
}

export default useFilterRestaurant
