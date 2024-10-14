const mongoose = require('mongoose')

const replySchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    idUser: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
)

const commentSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    idUser: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    idPartner: {
      type: mongoose.Types.ObjectId,
      ref: 'Partner',
      required: true
    },
    replies: [replySchema]
  },
  { timestamps: true, collection: 'Comment' }
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
