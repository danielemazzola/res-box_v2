const mongoose = require('mongoose')

const replySchema = mongoose.Schema(
  {
    idUser: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    idComment: {
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
      require: true
    },
    content: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'Reply'
  }
)

const Reply = mongoose.model('Reply', replySchema)

module.exports = Reply
