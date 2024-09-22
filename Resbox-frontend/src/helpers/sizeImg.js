export const sizeImg = (file) => {
  const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return false
    }
    return true
}