import React, { useContext, useEffect } from 'react'
import { ReducersContext } from '../../context/reducers/ReducersContext'
import NotFound from '../../pages/404/NotFound'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const {
    stateIsAuth: { user, isAuth }
  } = useContext(ReducersContext)

  if (!user || !user.roles) {
    return <NotFound />
  }

  return isAuth ? <div>{children}</div> : <NotFound />
}

export default ProtectedRoute
