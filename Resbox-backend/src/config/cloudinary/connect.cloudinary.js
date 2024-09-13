const CLOUDINARY = require('cloudinary').v2

const connectCloudinary = () => {
  CLOUDINARY.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_secret: process.env.CLOUDINARY_SECRET,
    api_key: process.env.CLOUDINARY_KEY
  })
}
module.exports = connectCloudinary
