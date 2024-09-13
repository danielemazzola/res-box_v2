const ROUTER = require('express').Router()

const user_routes = require('../routes/user.routes/user.routes')
ROUTER.use('/user', user_routes)

const partner_routes = require('../routes/partner.routes/partner.routes')
ROUTER.use('/partner', partner_routes)

const box_routes = require('../routes/box.routes/box.routes')
ROUTER.use('/box', box_routes)

const operation_routes = require('../routes/operation.routes/operation.routes')
ROUTER.use('/operation', operation_routes)

module.exports = ROUTER
