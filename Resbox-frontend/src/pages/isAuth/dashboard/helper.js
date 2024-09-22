export const handleImageClick = (fileInputRef) => {
  if (fileInputRef.current) {
    fileInputRef.current.click()
  } else {
    return
  }
}
export const handleRedeemCode = (setStateModal, stateModal) => {
  setStateModal((prev) => ({
    ...prev,
    redeem: !stateModal.redeem
  }))
}