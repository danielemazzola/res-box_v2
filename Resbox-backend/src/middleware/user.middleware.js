const { verifyToken } = require('../config/jwt/jwt')
const User = require('../models/user.model/user.model')
const { findUserByEmail } = require('./helpers/helpers')

// Middleware para verificar si un usuario ya existe (registro)
const checkDuplicateUser = async (req, res, next) => {
  try {
    const user_exist = await findUserByEmail(req.body.email)
    if (!user_exist) {
      next()
    } else {
      return res.status(409).json({
        message: `El correo ${user_exist.email} ya está registrado.`
      })
    }
  } catch (error) {
    next(error)
  }
}

// Middleware para verificar si un usuario existe (login)
const checkUserExist = async (req, res, next) => {
  try {
    const user_exist = await findUserByEmail(req.body.email)

    if (user_exist) {
      req.user = user_exist
      next()
    } else {
      return res.status(409).json({
        message: `El correo ${req.body.email} no está registrado.`
      })
    }
  } catch (error) {
    next(error)
  }
}

// Middleware para verificar que el usuario está autenticado
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token)
    return res.status(401).json({
      message: 'Hubo un problema de autenticación, inicia sesión.'
    })
  try {
    const decode = verifyToken(token, process.env.JWT_KEY)
    const user = await User.findById(decode.id)
    if (!user) {
      return res.status(401).json({
        message: 'Usuario no registrado.'
      })
    } else {
      req.user = user
      next()
    }
  } catch (error) {
    next(new Error('La sesión anterior ha finalizado.'))
  }
}

// Comprobar si el token existe (modificar password)
const checkToken = async (req, res, next) => {
  const { token } = req.params
  try {
    const user = await User.findOne({ token })
    if (!user) {
      return res.status(404).json({
        message: 'Hubo un problema en la solicitud, intenta iniciar sesión.'
      })
    } else {
      req.user = user
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkDuplicateUser,
  checkUserExist,
  authenticateUser,
  checkToken
}
