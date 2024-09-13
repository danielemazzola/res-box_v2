const Operation = require('../models/operation.model/operation.model')

const existOperationToken = async (req, res, next) => {
  const { secure_token } = req.params
  try {
    const exist = await Operation.findOne({ secure_token })
    if (!exist) {
      return res.status(409).json({ message: 'No existe esta operación.' })
    }
    req.operation = exist
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { existOperationToken }
