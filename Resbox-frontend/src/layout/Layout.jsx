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
  const { stateIsAuth } = useContext(ReducersContext)
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
      </header>
      <main>
        <ToastNotification />
        <ButtonTopScroll />
        <Outlet />
      </main>
      {!stateIsAuth.isAuth && <Footer />}
    </>
  )
}

export default Layout
