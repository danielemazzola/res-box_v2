require('dotenv').config()
const EXPRESS = require('express')
const CORS = require('cors')
const connection = require('./src/config/connection/connection')
const connectCloudinary = require('./src/config/cloudinary/connect.cloudinary')
const APP = EXPRESS()

APP.use(EXPRESS.json())
APP.use(CORS())
connection()
connectCloudinary()

const main_routes = require('./src/routes/main.routes')
APP.use('/secure/api/v1', main_routes)

APP.get('*', (req, res, next) => {
  const error = new Error(
    'La url a la que intentas acceder no existe, por favor contacta con soporte'
  )
  error.status = 404
  next(error)
})

APP.use((error, req, res, next) => {
  console.error('Error detectado: ', error.message)
  res.status(error.status || 500).json({
    message:
      error.message || 'Hubo un problema en el servidor, intenta más tarde.'
  })
})

const PORT = process.env.PORT || 4000
APP.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ` + PORT))
