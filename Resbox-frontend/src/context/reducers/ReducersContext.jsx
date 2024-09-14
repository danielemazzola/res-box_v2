import { createContext, useReducer } from 'react'
import {
  initStatePartner,
  statePartner
} from '../../reducer/partner-reducer/partner.reducer'
import {
  initStateToast,
  stateToast
} from '../../reducer/toast-notification-reducer/toast.reducer'

export const ReducersContext = createContext()

export const ReducersProvider = ({ children }) => {
  const [statePartners, dispatchPartners] = useReducer(
    statePartner,
    initStatePartner
  )
  const [stateToasts, dispatchToast] = useReducer(stateToast, initStateToast)

  return (
    <ReducersContext.Provider
      value={{ statePartners, dispatchPartners, stateToasts, dispatchToast }}
    >
      {children}
    </ReducersContext.Provider>
  )
}
