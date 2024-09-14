import React, { useContext, useEffect } from 'react'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import useScrollToRef from '../../hooks/useScrollToRef'
import './Home.css'
import HowItWorks from '../../components/how-it-works/HowItWorks'
import { fetchGetPartners } from '../../services/fetch-partner/getPartners'
import { ReducersContext } from '../../context/reducers/ReducersContext'

const Home = () => {
  const { refPartnersSection, filterPartnersRef } = useContext(ScrollRefContext)
  const scrollToRef = useScrollToRef()
  const {
    statePartners: { partners },
    dispatchPartners
  } = useContext(ReducersContext)
  useEffect(() => {
    const getPartners = async (dispatch) => {
      await fetchGetPartners(dispatch)
    }
    if (!partners.length) {
      getPartners(dispatchPartners)
    } else return
  }, [])

  return (
    <div ref={refPartnersSection}>
      <div className=''>
        <h2 className=''>¿Donde puedes consumir tus boxs?</h2>
      </div>
      <div className=''>
        <h3 className=''>Estamos en:</h3>
      </div>
      <ul ref={filterPartnersRef}>
        {partners
          ?.map((el) => el.country)
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((country, index) => (
            <li
              key={index}
              className=''
              onClick={() => (
                getFilterPartners(country, partners),
                scrollToRef(filterPartnersRef)
              )}
            >
              {country}
            </li>
          ))}
      </ul>
      <HowItWorks />
    </div>
  )
}

export default Home
