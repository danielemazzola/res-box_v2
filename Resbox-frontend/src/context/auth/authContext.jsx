import { createContext, useEffect, useContext } from 'react'
import { fetchAuth } from '../../services/fetch-auth/fetchAuth'
import { ReducersContext } from '../reducers/ReducersContext'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { dispatchAuth, dispatchLoader, dispatchToast } =
    useContext(ReducersContext)
  useEffect(() => {
    const isAuth = async () => {
      const token = localStorage.getItem('SECURE_CODE_RESBOX')
      if (token) {
        const { response, data } = await fetchAuth(
          'user/profile-user',
          {},
          'GET',
          dispatchLoader,
          dispatchToast,
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
      } else {
        // REVISAR LUEGO SI DEBO REDIRIGIR AL HOME
        return
      }
    }
    isAuth()
  }, [])

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
