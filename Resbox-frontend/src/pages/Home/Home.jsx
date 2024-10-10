import React, { useContext, useEffect } from 'react'
import { ScrollRefContext } from '../../context/scroll-ref/ScrollRefContext'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import HowItWorks from '../../components/home/how-it-works/HowItWorks'
import InformationApp from '../../components/home/information-app/InformationApp'
import PromoBox from '../isAuth/promo-box/PromoBox'
import { fetchGetHome } from '../../services/fetch-partner/fetchPartners'
import './Home.css'
import useScrollToRef from '../../hooks/useScrollToRef'
import { AuthContext } from '../../context/auth/AuthContext'

const Home = () => {
  const scrollToRef = useScrollToRef()
  const {
    refPartnersSection,
    refFunctionAppSection,
    refBoxesSection,
    refHeaderSection
  } = useContext(ScrollRefContext)

  const { isAuth, token } = useContext(AuthContext)

  const {
    statePartners: { partners, usersCount },
    dispatchPartners,
    dispatchLoader,
    dispatchToast
  } = useContext(ReducersContext)

  useEffect(() => {
    if (token) {
      isAuth()
    }

    if (partners.length <= 0) {
      getPartners()
    }
    if (usersCount <= 0) {
      getUsers()
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      scrollToRef(refHeaderSection)
    }, 500)
  }, [])

  const getPartners = async () => {
    try {
      dispatchLoader({ type: 'SET_LOAD_TRUE' })
      const urlApi = `${import.meta.env.VITE_URL_API}/partner`
      const { data } = await fetchGetHome(urlApi)
      dispatchPartners({ type: 'SET_PARTNERS', payload: data.partners })
    } catch (error) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: error.message, error: true }
      })
    } finally {
      dispatchLoader({ type: 'SET_LOAD_FALSE' })
    }
  }

  const getUsers = async () => {
    try {
      dispatchLoader({ type: 'SET_LOAD_TRUE' })
      const urlApi = `${import.meta.env.VITE_URL_API}/user`
      const { data } = await fetchGetHome(urlApi)
      dispatchPartners({ type: 'SET_COUNT_USERS', payload: data.users })
    } catch (error) {
      dispatchToast({
        type: 'ADD_NOTIFICATION',
        payload: { msg: error.message, error: true }
      })
    } finally {
      dispatchLoader({ type: 'SET_LOAD_FALSE' })
    }
  }

  return (
    <>
      <section ref={refPartnersSection} className='container-hero'>
        <InformationApp />
      </section>
      <section ref={refFunctionAppSection} className='contain-function'>
        <HowItWorks />
      </section>
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
