import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import ToastNotification from '../components/toast-notification/ToastNotification'

const Layout = () => {
  return (
    <>
      <Header />
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#ececec'
          fillOpacity='1'
          d='M0,160L48,160C96,160,192,160,288,144C384,128,480,96,576,101.3C672,107,768,149,864,160C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
        ></path>
      </svg>
      <main>
        <ToastNotification />
        <Outlet />
      </main>
    </>
  )
}

export default Layout
