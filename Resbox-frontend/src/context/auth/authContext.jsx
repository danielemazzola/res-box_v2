import { createContext, useState, useEffect, useContext } from 'react'
import { fetchAuth } from '../../services/fetch-auth/fetchAuth'
import { ReducersContext } from '../reducers/ReducersContext'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState('')
  const { dispatchLoader, dispatchToast } = useContext(ReducersContext)
  useEffect(() => {
    const isAuth = async () => {
      const token = localStorage.getItem('SECURE_CODE_RESBOX')
      if (token) {
        setJwt(token)
        console.log(token)

        //CREAR FETCH DE PROFILE
        const { response, data } = await fetchAuth(
          'user/profile-user', // urlApi
          {}, // formFields (vacio porque es un GET)
          'GET', // método
          dispatchLoader,
          dispatchToast
        )
        console.log(response)
        console.log(data)
      } else return
    }
    isAuth()
  }, [])
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
