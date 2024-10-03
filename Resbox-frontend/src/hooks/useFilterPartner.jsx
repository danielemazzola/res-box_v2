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
      idPartner = element._id
    return nameMatch || addressMatch || idPartner
  })
  return filteredResults
}

export default useFilterPartner
