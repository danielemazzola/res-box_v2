import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Modal from '../modal/Modal'
import restaurant from '/images/restaurante.ico'
import './Partner.css'

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
          <img
            className='modal-banner'
            src={partner.banner}
            alt={`${partner.name} banner`}
          />
          <div className='logo-absolute'>
            <img
              className='partner-avatar'
              src={partner.avatar}
              alt={`${partner.name} logo`}
              loading='lazy'
            />
          </div>
          <div className='modal-details'>
            <p>{partner.name}</p>
            <p>{partner.phone}</p>
            <p>{partner.address}</p>
            <p>{partner.city}</p>
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
