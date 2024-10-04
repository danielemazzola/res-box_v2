import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import ToastNotification from '../components/toast-notification/ToastNotification'
import ButtonTopScroll from '../components/button-top-scroll/ButtonTopScroll'
import Loader from '../components/loader/Loader'
import { ReducersContext } from '../context/reducers/ReducersContext'
import { canvas_index } from '../helpers/canvas'
import { AuthContext } from '../context/auth/AuthContext'
import Footer from '../components/footer/Footer'

const Layout = () => {
  canvas_index()
  const {
    stateLoader: { load }
  } = useContext(ReducersContext)
  const { isAuth, token } = useContext(AuthContext)
  useEffect(() => {
    if (token) {
      isAuth()
    }
  }, [])
  return (
    <>
      {load && <Loader />}
      <header>
        <Header />
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
          <path
            fill='#ececec'
            fillOpacity='1'
            d='M0,160L48,160C96,160,192,160,288,144C384,128,480,96,576,101.3C672,107,768,149,864,160C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
          ></path>
        </svg>
      </header>
      <main>
        <ToastNotification />
        <ButtonTopScroll />
        <Outlet />
      </main>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#ececec'
          fillOpacity='1'
          d='M0,160L80,176C160,192,320,224,480,240C640,256,800,256,960,261.3C1120,267,1280,277,1360,282.7L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'
        ></path>
      </svg>
      <Footer />
    </>
  )
}

export default Layout
