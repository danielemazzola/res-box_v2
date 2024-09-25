const ROUTER = require('express').Router()
const {
  newUser,
  authGoogle,
  login,
  profile,
  recoverPassword,
  putPassword,
  updateAvatar
} = require('../../controllers/user.controller/user.controller')
const { profileAvatar } = require('../../middleware/checkAvatar.middleware')
const {
  checkDuplicateUser,
  checkUserExist,
  authenticateUser,
  checkToken
} = require('../../middleware/user.middleware')

ROUTER.get('/profile-user', authenticateUser, profile)
ROUTER.post('/auth-google', authGoogle)
ROUTER.post('/register-user', checkDuplicateUser, newUser)
ROUTER.post('/login-user', checkUserExist, login)
ROUTER.post('/recovery-password-user', checkUserExist, recoverPassword)
ROUTER.put(`/new-password/:token`, checkToken, putPassword)
ROUTER.put(
  `/update-avatar`,
  authenticateUser,
  profileAvatar.single('avatar'),
  updateAvatar
)

module.exports = ROUTER
