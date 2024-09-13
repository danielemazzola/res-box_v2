const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const createStorage = (folderName) => {
  return new CloudinaryStorage({
    cloudinary,
    params: async (req, res) => {
      return {
        folder: folderName,
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
      }
    }
  })
}

const uploadFolder = (folderName) => {
  const storage = createStorage(folderName)
  return multer({ storage })
}
const profileAvatar = uploadFolder('avatar')
const profileBanner = uploadFolder('banner')

module.exports = { profileAvatar, profileBanner }
