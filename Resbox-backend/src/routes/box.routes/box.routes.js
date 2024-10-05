const ROUTER = require('express').Router()
const { existBox, existBoxes } = require('../../middleware/checkBox.middleware')
const { isAdmin } = require('../../middleware/protected.middleware')
const { authenticateUser } = require('../../middleware/user.middleware')
const {
  getBoxes,
  newBox,
  updateBox,
  removeBox,
  buyBox,
  buyBoxCart
} = require('../../controllers/box.controller/box.controller')

ROUTER.get('/', getBoxes)
ROUTER.post('/new-box', authenticateUser, isAdmin, newBox)
ROUTER.put(
  '/update-box/:id_box',
  existBox,
  authenticateUser,
  isAdmin,
  updateBox
)
ROUTER.delete(
  '/remove-box/:id_box',
  existBox,
  authenticateUser,
  isAdmin,
  removeBox
)
ROUTER.post('/buy-box/:id_box', existBox, authenticateUser, buyBox)
ROUTER.post('/buy-box-cart', existBoxes, authenticateUser, buyBoxCart)

module.exports = ROUTER
