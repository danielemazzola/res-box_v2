export const handleCloseModal = (setStateBoxCard) => {
  setStateBoxCard((prevState) => ({
    ...prevState,
    modalState: false
  }))
  setTimeout(() => {
    setStateBoxCard((prevState) => ({
      ...prevState,
      quantityRedemm: 1,
      secureTokenRedeem: 0
    }))
  }, 500)
}

export const containInformation = (boxes) => {
  const { box, id_partner_consumed } = boxes
  return [
    { text: 'Incluye', value: box.items_included },
    { text: 'Extra', value: box.bonus_items },
    { text: 'Precio', value: `${box.price}€` },
    {
      text: 'p/u',
      value: `${(box.price / (box.items_included + box.bonus_items)).toFixed(2)}€`
    },
    ...(id_partner_consumed.length > 0
      ? [
          {
            text: 'Usado en'
          }
        ]
      : [])
  ]
}
