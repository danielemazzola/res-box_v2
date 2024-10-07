import { createContext, useReducer } from 'react'
import {
  initStatePartner,
  statePartner
} from '../../reducer/partner-reducer/partner.reducer'
import {
  initStateToast,
  stateToast
} from '../../reducer/toast-notification-reducer/toast.reducer'
import {
  stateAuth,
  initStateAuth
} from '../../reducer/auth-reducer/auth.reducer'
import {
  initStateLoader,
  stateLoad
} from '../../reducer/loader-reducer/loader.reducer'
import {
  initStatePromoBox,
  statePromoBox
} from '../../reducer/promo-box/promobox.reducer'
import {
  initStateInvoice,
  stateInvoice
} from '../../reducer/invoice-reducer/invoice.reducer'

export const ReducersContext = createContext()

export const ReducersProvider = ({ children }) => {
  const [statePartners, dispatchPartners] = useReducer(
    statePartner,
    initStatePartner
  )
  const [stateToasts, dispatchToast] = useReducer(stateToast, initStateToast)
  const [stateIsAuth, dispatchAuth] = useReducer(stateAuth, initStateAuth)
  const [stateLoader, dispatchLoader] = useReducer(stateLoad, initStateLoader)
  const [statePromoBoxes, dispatchPromoBoxes] = useReducer(
    statePromoBox,
    initStatePromoBox
  )
  const [stateInvoices, dispatchInvoice] = useReducer(
    stateInvoice,
    initStateInvoice
  )

  return (
    <ReducersContext.Provider
      value={{
        statePartners,
        dispatchPartners,
        stateToasts,
        dispatchToast,
        stateIsAuth,
        dispatchAuth,
        stateLoader,
        dispatchLoader,
        statePromoBoxes,
        dispatchPromoBoxes,
        stateInvoices,
        dispatchInvoice
      }}
    >
      {children}
    </ReducersContext.Provider>
  )
}
