import React, { useContext, useEffect } from 'react'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import HowItWorks from '../../components/home/how-it-works/HowItWorks'
import InformationApp from '../../components/home/information-app/InformationApp'
import PromoBox from '../isAuth/promo-box/PromoBox'
import { fetchGetPartners } from '../../services/fetch-partner/fetchPartners'
import './Home.css'

const Home = () => {
  const { refPartnersSection, refFunctionAppSection, refBoxesSection } =
    useContext(ScrollRefContext)
  const {
    statePartners: { partners },
    dispatchPartners,
    dispatchLoader,
    dispatchToast
  } = useContext(ReducersContext)

  useEffect(() => {
    const getPartners = async () => {
      try {
        dispatchLoader({ type: 'SET_LOAD_TRUE' })
        const { data } = await fetchGetPartners()
        dispatchPartners({ type: 'SET_PARTNERS', payload: data.partners })
      } catch (error) {
        dispatchToast({
          type: 'ADD_NOTIFICATION',
          payload: { msg: error.message, error: true }
        })
      } finally {
        setTimeout(() => {
          dispatchLoader({ type: 'SET_LOAD_FALSE' })
        }, 1500)
      }
    }
    if (partners.length <= 0) {
      getPartners()
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
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#ececec'
          fillOpacity='1'
          d='M0,160L48,160C96,160,192,160,288,144C384,128,480,96,576,101.3C672,107,768,149,864,160C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
        ></path>
      </svg>
      <section
        ref={refBoxesSection}
        className='contain-function home__promo-box-section'
      >
        <PromoBox />
      </section>
    </>
  )
}

export default Home
