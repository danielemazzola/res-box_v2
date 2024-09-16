import { createContext, useState, useEffect, useContext } from 'react'
import { fetchAuth } from '../../services/fetch-auth/fetchAuth'
import { ReducersContext } from '../reducers/ReducersContext'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState('')
  const { dispatchAuth, dispatchLoader, dispatchToast } =
    useContext(ReducersContext)
  useEffect(() => {
    const isAuth = async () => {
      const token = localStorage.getItem('SECURE_CODE_RESBOX')
      if (token) {
        setJwt(token)
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
        } else {
          dispatchAuth({ type: 'SET_USER', payload: data.user })
        }
      } else return
    }
    isAuth()
  }, [])
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
