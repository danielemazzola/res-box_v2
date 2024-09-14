import React, { useContext, useEffect } from 'react'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import HowItWorks from '../../components/home/how-it-works/HowItWorks'
import { fetchGetPartners } from '../../services/fetch-partner/getPartners'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import InformationApp from '../../components/home/information-app/InformationApp'
import './Home.css'

const Home = () => {
  const { refPartnersSection, filterPartnersRef, refFunctionAppSection } =
    useContext(ScrollRefContext)
  const {
    statePartners: { partners },
    dispatchPartners
  } = useContext(ReducersContext)

  useEffect(() => {
    const getPartners = async (dispatchPartners) => {
      await fetchGetPartners(dispatchPartners)
    }
    if (partners.length <= 0) {
      getPartners(dispatchPartners)
    } else return
  }, [])

  return (
    <>
      <section ref={refPartnersSection} className='container-hero'>
        <InformationApp />
      </section>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#ececec'
          fillOpacity='1'
          d='M0,160L80,176C160,192,320,224,480,240C640,256,800,256,960,261.3C1120,267,1280,277,1360,282.7L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'
        ></path>
      </svg>
      <section ref={refFunctionAppSection} className='contain-function'>
        <HowItWorks />
      </section>
    </>
  )
}

export default Home
