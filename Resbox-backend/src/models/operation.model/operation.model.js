const mongoose = require('mongoose')

const paidSchema = mongoose.Schema(
  {
    paid: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
      required: true
    },
    id_who_paid: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      default: null
    },
    id_transaction: {
      type: String,
      trim: true,
      default: null
    }
  },
  { timestamps: true }
)

const operationsSchema = mongoose.Schema(
  {
    invoice_number:{
      type:String,
      required:true
    },
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
      type: paidSchema,
      default: () => ({
        paid: 'pending',
        id_who_paid: null,
        id_transaction: null
      }),
      required: true
    },
    amount: {
      type: Number,
      default: 0,
      required: true
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
