import { createContext, useEffect, useContext, useState } from 'react'
import { fetchAuth } from '../../services/fetch-auth/fetchAuth'
import { ReducersContext } from '../reducers/ReducersContext'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [API_URL, setUrlImageChange] = useState({
    user_avatar: 'user/update-avatar',
    partner_avatar: 'partner/update-avatar',
    partner_banner: 'partner/update-banner',
    user_operation: 'operation/new-operation',
    user_add_more: 'box/buy-box',
    my_operations: 'operation'
  })
  const [token, setToken] = useState(localStorage.getItem('SECURE_CODE_RESBOX'))

  const { dispatchAuth, dispatchLoader, dispatchToast } =
    useContext(ReducersContext)
  useEffect(() => {
    const isAuth = async () => {
      if (token) {
        const { response, data } = await fetchAuth(
          'user/profile-user',
          {},
          'GET',
          token
        )
        if (response.status !== 200) {
          dispatchToast({
            type: 'ADD_NOTIFICATION',
            payload: { msg: `Error: ${data.message}`, error: true }
          })
          localStorage.removeItem('SECURE_CODE_RESBOX')
          dispatchAuth({ type: 'SET_AUTH_FALSE' })
        } else {
          dispatchAuth({ type: 'SET_USER', payload: data.user })
          dispatchAuth({ type: 'SET_AUTH_TRUE' })
        }
      }
    }
    isAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        API_URL,
        token,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
