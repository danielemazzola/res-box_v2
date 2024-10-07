import { getDate } from '../../helpers/date'
import like from '/images/like.png'
import heart from '/images/heart.png'

export const arrInfoPartner = (partner) => {
  const infoPartner = [
    { key: 'nombre', value: partner.name },
    { key: 'CIF', value: partner.cif },
    { key: 'email', value: partner.email },
    {
      key: 'propietaria/o',
      value: partner.owner_name + ' ' + partner.owner_lastname
    },
    { key: 'Dirección', value: partner.city + ' ' + partner.address },
    {
      key: 'Usuarios vinculados',
      value: partner?.users?.length
        ? partner.users
        : 'No hay usuarios vinculados'
    },
    { key: 'Cuenta creada', value: getDate(partner.createdAt) },
    { key: 'Estado', value: partner.confirmed ? 'ACTIVO' : 'PENDIENTE' },
    {
      key: 'Likes',
      value_text: partner.favorite,
      value: partner.favorite > 0 ? like : heart
    }
  ]
  return infoPartner
}
