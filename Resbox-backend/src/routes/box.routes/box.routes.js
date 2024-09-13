const ROUTER = require('express').Router()
const { existBox } = require('../../middleware/checkBox.middleware')
const { isAdmin } = require('../../middleware/protected.middleware')
const { authenticateUser } = require('../../middleware/user.middleware')
const {
  getBoxes,
  newBox,
  updateBox,
  removeBox,
  buyBox
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

module.exports = ROUTER
