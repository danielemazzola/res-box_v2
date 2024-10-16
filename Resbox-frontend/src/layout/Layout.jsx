import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import ToastNotification from '../components/toast-notification/ToastNotification'
import ButtonTopScroll from '../components/button-top-scroll/ButtonTopScroll'
import Loader from '../components/loader/Loader'
import { ReducersContext } from '../context/reducers/ReducersContext'
import { canvas_index } from '../helpers/canvas'
import Footer from '../components/footer/Footer'
import { AuthContext } from '../context/auth/AuthContext'

const Layout = () => {
  canvas_index()
  const {
    stateLoader: { load }
    /* isAuth */
  } = useContext(ReducersContext)

  const { token, getProfile } = useContext(AuthContext)

  useEffect(() => {
    if (token) {
      getProfile()
    }
  }, [])

  return (
    <>
      {load && <Loader />}
      <header>
        <Header />
      </header>
      <main>
        <ToastNotification />
        <ButtonTopScroll />
        <Outlet />
      </main>
      {/* {isAuth && <Footer />} */}
      <Footer />
    </>
  )
}

export default Layout
