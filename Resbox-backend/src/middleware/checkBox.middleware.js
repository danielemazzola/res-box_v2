const Box = require('../models/box.model/box.model')

const existBox = async (req, res, next) => {
  const { id_box } = req.params
  try {
    const exist_box = await Box.findById(id_box)
    if (!exist_box) {
      return res.status(404).json({ message: 'Box no encontrado.' })
    } else {
      req.box = exist_box
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { existBox }
