import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Modal from '../modal/Modal'
import restaurant from '/images/restaurante.ico'
import './Partner.css'
import like from '/images/like.png'
import heart from '/images/heart.png'
import { Link } from 'react-router-dom'

// Define el ícono personalizado
const restaurantIcon = new L.Icon({
  iconUrl: restaurant,
  iconRetinaUrl: restaurant,
  iconSize: [32, 32], // Ajusta el tamaño del ícono según tus necesidades
  iconAnchor: [16, 32], // Ajusta el punto de anclaje del ícono (la parte inferior central del ícono en este caso)
  popupAnchor: [0, -32] // Ajusta el punto desde el cual el popup se abre
})

const Partner = ({ partner, arrayFilterPartners }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className='partner-card'>
      <div className='partner-header'>
        <img
          onClick={() => setIsModalOpen(true)}
          className='partner-avatar show'
          src={partner.avatar}
          alt={`${partner.name} logo`}
          loading='lazy'
        />
        <span
          className={`name-partner-span show ${
            arrayFilterPartners?.length > 0 ? 'filterd-text-card' : ''
          }`}
        >
          {partner.name}
        </span>
      </div>

      <Modal
        isModalOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
      >
        <div className='modal-content'>
          <div className='modal-content-banner'>
            <img
              src={partner.banner}
              alt={`${partner.name} banner`}
              loading='lazy'
            />
          </div>
          <div className='logo-absolute'>
            <img
              className='partner-avatar'
              src={partner.avatar}
              alt={`${partner.name} logo`}
              loading='lazy'
            />
          </div>
          <div className='partner__like-content-favorite'>
            {partner.favorite <= 0 ? (
              <>
                <img alt='Likes' src={heart} width='20' loading='lazy' />
              </>
            ) : (
              <>
                <img alt='Likes' src={like} width='20' loading='lazy' />
              </>
            )}
            <span>{partner.favorite}</span>
          </div>
          <div className='modal-details'>
            <p>{partner.name}</p>
            <p>Tlf: {partner.phone}</p>
            <p>{partner.address}</p>
            <p>{partner.city}</p>
            <Link to={`/comments/${partner._id}`} className='link__RRD'>¿Que dicen de nosotros?</Link>
          </div>
          <div>
          </div>
          <div className='container-map-view'>
            <div>
              <MapContainer
                center={[partner.coordinate_x, partner.coordinate_y]}
                zoom={13}
                style={{ height: '30vh', width: '100%', borderRadius: '15px' }}
              >
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                <Marker
                  position={[partner.coordinate_x, partner.coordinate_y]}
                  icon={restaurantIcon}
                >
                  <Popup>{partner.restaurant_name}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Partner
