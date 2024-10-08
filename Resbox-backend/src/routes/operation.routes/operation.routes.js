const ROUTER = require('express').Router()
const {
  newOperation,
  updateOperation,
  getOperationBuyPartner
} = require('../../controllers/operation.controller/operation.controller')
const {
  existOperationToken
} = require('../../middleware/checkOperationToken.middleware')
const { isPartner } = require('../../middleware/protected.middleware')
const { authenticateUser } = require('../../middleware/user.middleware')

ROUTER.get('/', authenticateUser, isPartner, getOperationBuyPartner)
ROUTER.post('/new-operation/:id_box', authenticateUser, newOperation)
ROUTER.put(
  '/update-operation/:secure_token',
  authenticateUser,
  existOperationToken,
  isPartner,
  updateOperation
)

module.exports = ROUTER
