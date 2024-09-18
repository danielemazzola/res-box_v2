import { getDate } from "../../helpers/date";

export const getRandomBackgroundColor = () => {
  const colors = [
    'var(--br-bg-boxes-1)',
    'var(--br-bg-boxes-2)',
    'var(--br-bg-boxes-3)',
    'var(--br-bg-boxes-4)',
    'var(--br-bg-boxes-5)',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return randomColor;
};

export const handleCloseModal = (setModalState, setQuantityRedeem, setSecureTokenRedeem ) => {
  setModalState(false)
  setTimeout(() => {
    setQuantityRedeem(1)
    setSecureTokenRedeem(0)
  }, 500)
}

export const containInformation = (box) => {
  return  [
    { text: 'Incluye', value: box.box.items_included },
    { text: 'Extra', value: box.box.bonus_items },
    { text: 'Precio', value: box.box.price },
    {
      text: 'p/u',
      value: (
        box.box.price /
        (box.box.items_included + box.box.bonus_items)
      ).toFixed(2)
    },
    ...(box.id_partner_consumed.length > 0
      ? [
          {
            text: 'Usado en'
          }
        ]
      : []),
    { text: 'Fecha adquirido', value: getDate(box.box.createdAt) }
  ]
}