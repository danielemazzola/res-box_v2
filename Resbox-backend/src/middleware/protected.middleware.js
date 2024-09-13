const Partner = require('../models/partner.model/partner.model')
const User = require('../models/user.model/user.model')

const isAdmin = async (req, res, next) => {
  const { user } = req
  try {
    const admin = await User.findById(user._id)
    if (admin.roles.includes('admin')) {
      next()
    } else {
      return res
        .status(401)
        .json({ message: 'No tienes permisos de administrador.' })
    }
  } catch (error) {
    next(error)
  }
}

const isPartner = async (req, res, next) => {
  const { user } = req
  try {
    if (user.roles.includes('partner')) {
      const partnerInfo = await Partner.findById(user.idPartner)
      req.partner = partnerInfo
      next()
    } else {
      return res
        .status(401)
        .json({ message: 'No tienes permisos suficientes.' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  isAdmin,
  isPartner
}
