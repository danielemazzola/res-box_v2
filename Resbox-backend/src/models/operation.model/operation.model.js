const mongoose = require('mongoose')

const paidSchema = mongoose.Schema(
  {
    paid: {
      type: Boolean,
      default: false,
      required: true
    },
    id_who_paid: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      default: null, // Valor por defecto: nadie ha pagado aún
      required: function () {
        return this.paid // Solo requerido si 'paid' es true
      }
    },
    id_transaction: {
      type: String,
      trim: true,
      default: null, // No hay transacción por defecto
      required: function () {
        return this.paid // Solo requerido si 'paid' es true
      }
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
      type: paidSchema,
      default: () => ({ paid: false, id_who_paid: null, id_transaction: null }),
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
