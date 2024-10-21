const ROUTER = require('express').Router()
const { authenticateUser } = require('../../middleware/user.middleware')
const {
  getComments,
  newComment,
  newReply,
  getReplies
} = require('../../controllers/comment.controller/comment.controller')

ROUTER.get('/get-comments/:idPartner', getComments)
ROUTER.get('/get-replies/:idComment', getReplies)
ROUTER.post('/new-comment/:idPartner', authenticateUser, newComment)
ROUTER.post('/new-reply/:idComment', authenticateUser, newReply)

module.exports = ROUTER
