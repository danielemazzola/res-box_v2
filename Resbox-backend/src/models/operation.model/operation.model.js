const mongoose = require('mongoose')

const paidSchema = mongoose.Schema(
  {
    paid: {
      type: Boolean
    },
    id_who_paid: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    id_transaction: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
)

const operationsSchema = mongoose.Schema(
  {
    id_user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    id_partner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    id_box: {
      type: mongoose.Types.ObjectId,
      ref: 'Box',
      required: true
    },
    consumed: {
      type: Number,
      required: true
    },
    paid: {
      type: paidSchema
    },
    transaction_date: {
      type: Date,
      default: Date.now
    },
    secure_token: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active'
    }
  },
  {
    timestamps: true,
    collection: 'Operation'
  }
)

const Operation = mongoose.model('Operation', operationsSchema)

module.exports = Operation
