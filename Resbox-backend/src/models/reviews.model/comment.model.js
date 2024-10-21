const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
  {
    idUser: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    idPartner: {
      type: mongoose.Types.ObjectId,
      ref: 'Partner',
      required: true
    },
    content: { type: String, required: true },
    replies: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true, collection: 'Comment' }
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
