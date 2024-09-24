const ROUTER = require('express').Router()
const {
  getPartners,
  getPartner,
  newPartnerFile,
  newPartner,
  updatAvatar,
  updateBanner
} = require('../../controllers/partner.controller/partner.controller')
const {
  profileAvatar,
  profileBanner
} = require('../../middleware/checkAvatar.middleware')
const {
  uploadFile,
  existFile
} = require('../../middleware/checkFile.middleware')
const { isAdmin, isPartner } = require('../../middleware/protected.middleware')
const { authenticateUser } = require('../../middleware/user.middleware')

ROUTER.get('/', getPartners)
ROUTER.get('/:id_partner', authenticateUser, getPartner)
ROUTER.post(
  '/new-partner-file',
  authenticateUser,
  isAdmin,
  uploadFile.single('file'),
  existFile,
  newPartnerFile
)
ROUTER.post('/new-partner', authenticateUser, /* isAdmin, */ newPartner)
ROUTER.put(
  '/update-avatar',
  authenticateUser,
  isPartner,
  profileAvatar.single('avatar'),
  existFile,
  updatAvatar
)
ROUTER.put(
  '/update-banner',
  authenticateUser,
  isPartner,
  profileBanner.single('banner'),
  existFile,
  updateBanner
)

module.exports = ROUTER
