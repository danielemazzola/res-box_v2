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

const existBoxes = async (req, res, next) => {
  const { boxes } = req.body
  let exist = []
  let no_exist = []
  let inactive = []
  try {
    for (const box of boxes) {
      const exist_box = await Box.findById(box._id)
      if (!exist_box) {
        no_exist.push(box)
      } else if (exist_box.status.includes('active')) {
        exist.push(box)
      } else {
        inactive.push(box)
      }
    }
    req.no_exist = no_exist
    req.exist = exist
    req.inactive = inactive
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { existBox, existBoxes }
