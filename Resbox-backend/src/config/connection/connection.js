const mongoose = require('mongoose')

const connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_DDBB)
    console.log('Conectado a la base de datos')
  } catch (error) {
    console.log('Error al conectar', error)
  }
}

module.exports = connection
