import { createContext, useRef } from 'react'

export const ScrollRefContext = createContext()

export const ScrollRefProvider = ({ children }) => {
  const refHeaderSection = useRef(null)
  const refPartnersSection = useRef(null)
  const refFunctionAppSection = useRef(null)
  const refPartnerSearch = useRef(null)
  const refPartner = useRef(null)
  const refFunctionApp = useRef(null)
  const filterPartnersRef = useRef(null)
  const refDashboardSection = useRef(null)
  const fileInputRef = useRef(null)
  const refPartnerInfo = useRef(null)
  const fileBannerRef = useRef(null)
  const fileAvatarRef = useRef(null)
  const refBoxesSection = useRef(null)
  const refBoxes = useRef(null)
  const refOperations = useRef(null)
  const refNewPartner = useRef(null)
  const sectionRefOperations = useRef(null)
  const sectionRefCartItems = useRef(null)
  const refInvoidSection = useRef(null)
  const refInvoidPDF = useRef(null)

  return (
    <ScrollRefContext.Provider
      value={{
        refHeaderSection,
        refPartnersSection,
        refFunctionAppSection,
        refPartner,
        refPartnerSearch,
        refFunctionApp,
        filterPartnersRef,
        refDashboardSection,
        fileInputRef,
        sectionRefOperations,
        refPartnerInfo,
        fileBannerRef,
        fileAvatarRef,
        refBoxesSection,
        refBoxes,
        refOperations,
        refNewPartner,
        sectionRefCartItems,
        refInvoidSection,
        refInvoidPDF
      }}
    >
      {children}
    </ScrollRefContext.Provider>
  )
}
