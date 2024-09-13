const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const uploadFile = multer({ storage: storage })

const existFile = async (req, res, next) => {
  if (req.file) {
    next()
  } else {
    return res.status(400).json({ message: 'No se detectó ningún archivo.' })
  }
}

module.exports = { uploadFile, existFile }
