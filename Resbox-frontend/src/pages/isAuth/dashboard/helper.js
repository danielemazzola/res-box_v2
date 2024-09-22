export const handleImageClick = (fileInputRef) => {
  if (fileInputRef.current) {
    fileInputRef.current.click()
  } else {
    return
  }
}