import { createContext, useReducer } from 'react'
import { initState, state } from '../../reducer/partner-reducer/partner.reducer'

export const ReducersContext = createContext()

export const ReducersProvider = ({ children }) => {
  const [statePartners, dispatchPartners] = useReducer(state, initState)
  return (
    <ReducersContext.Provider value={{ statePartners, dispatchPartners }}>
      {children}
    </ReducersContext.Provider>
  )
}
