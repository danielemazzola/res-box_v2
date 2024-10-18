const ROUTER = require('express').Router()
const { authenticateUser } = require('../../middleware/user.middleware')
const {
  getComments,
  newComment,
  replyComment
} = require('../../controllers/comment.controller/comment.controller')

ROUTER.get('/get-comments/:idPartner', getComments)
ROUTER.post('/new-comment/:idPartner', authenticateUser, newComment)
ROUTER.post('/reply-comment/:idComment', authenticateUser, replyComment)

module.exports = ROUTER
