const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema(
  {
    invoice_number: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    box: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Box',
      required: true
    }],
    amount: {
      type: Number,
      required: true
    },
    status: {
      type:String,
      enum:['pendiente','denegado', 'aprobado'],
      default:'pendiente'
    }
  },
  {
    timestamps: true,
    collection: 'Invoice'
  }
)

const Invoice = mongoose.model('Invoice', invoiceSchema)
module.exports = Invoice
