import React, { useContext, useState } from 'react'
import useScrollToRef from '../../../hooks/useScrollToRef'
import { ScrollRefContext } from '../../../context/scroll-ref/ScrollRefContext'
import { ReducersContext } from '../../../context/reducers/ReducersContext'
import './InformationApp.css'
import {
  getFilterPartners,
  handleCloseFilter,
  handleSearchPartner
} from '../../../reducer/partner-reducer/partner.action'
import logo from '/images/logo.png'
import Partner from '../../partner/Partner'
import useFilterRestaurant from '../../../hooks/useFilterRestaurant'

const InformationApp = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const scrollToRef = useScrollToRef()
  const { filterPartnersRef, refPartnersSection } = useContext(ScrollRefContext)
  const {
    statePartners: {
      partners,
      filterState,
      arrayFilterPartners,
      arrayFilterPartnersSearch
    },
    dispatchPartners
  } = useContext(ReducersContext)

  return (
    <>
      <div className='container-partners'>
        <div className='contain-partners-title show'>
          <h2 className=''>¿Donde puedes consumir tus boxs?</h2>
        </div>
        <div className='container-country-partners'>
          <h3 className='show'>Estamos en:</h3>
        </div>
        <ul ref={filterPartnersRef} className='container-ul-targets'>
          {partners
            ?.map((el) => el.country)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((country, index) => (
              <li
                key={index}
                className='show'
                onClick={() => {
                  getFilterPartners(
                    country,
                    partners,
                    dispatchPartners,
                    arrayFilterPartners
                  )
                  scrollToRef(filterPartnersRef)
                }}
              >
                {country}
              </li>
            ))}
        </ul>
      </div>

      <div className={` ${filterState ? 'container-filter-results' : ''}`}>
        {filterState && (
          <div>
            <div className='contain-tilte-search-filter'>
              <h4 className={`result-filter-partners`}>
                {arrayFilterPartners[0].country}
              </h4>
              <div className='container-result-search'>
                <img
                  src={logo}
                  alt='logo res-box'
                  width='38'
                  className='waveEffect'
                />
                <input
                  placeholder='Buscar colaborador'
                  type='text'
                  onChange={(e) =>
                    handleSearchPartner(
                      e,
                      setSearchTerm,
                      searchTerm,
                      dispatchPartners,
                      useFilterRestaurant,
                      arrayFilterPartners
                    )
                  }
                />
              </div>
              <div>
                <button
                  onClick={() =>
                    handleCloseFilter(
                      dispatchPartners,
                      scrollToRef,
                      refPartnersSection
                    )
                  }
                >
                  ❌
                </button>
              </div>
            </div>
            <div className='last-ten-partners-filter'>
              <p>Resultados de busqueda: {arrayFilterPartnersSearch.length}</p>
              <div className={`container-cards-partners `}>
                {arrayFilterPartnersSearch?.map((partner) => (
                  <div key={partner._id}>
                    <Partner
                      partner={partner}
                      arrayFilterPartners={arrayFilterPartnersSearch}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='last-ten-partners-filter'>
              <p>Últimos 10 Partners en: {arrayFilterPartners[0].country}:</p>
              <div className={`container-cards-partners`}>
                {arrayFilterPartners?.map((partner) => (
                  <div key={partner._id}>
                    <Partner
                      partner={partner}
                      arrayFilterPartners={arrayFilterPartners}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {partners && partners.length > 0 ? (
        <div className='container-cards-partners'>
          {partners
            .map((partner) => (
              <div key={partner._id}>
                <Partner partner={partner} />
              </div>
            ))
            .reverse()
            .slice(0, 20)}
        </div>
      ) : (
        <p className='paragraph-no-partners'>
          No hay colaboradores disponibles
        </p>
      )}
    </>
  )
}

export default InformationApp
