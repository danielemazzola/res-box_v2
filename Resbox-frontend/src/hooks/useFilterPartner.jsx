const useFilterPartner = (searchTerm, arrayPartners) => {
  const filteredResults = arrayPartners.filter((element) => {
    let addressMatch
    let idPartner
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

export default useFilterPartner
