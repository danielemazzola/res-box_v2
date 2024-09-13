const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const purchasedBoxSchema = new mongoose.Schema(
  {
    box: {
      type: mongoose.Types.ObjectId,
      ref: 'Box',
      required: true
    },
    remainingItems: {
      type: Number,
      required: true
    },
    id_partner_consumed: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Partner',
        required: true
      }
    ]
  },
  { timestamps: true }
)

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    lastname: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'
    },
    token: {
      type: String,
      trim: true
    },
    idPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Partner'
    },
    purchasedBoxes: [purchasedBoxSchema],
    roles: {
      type: [String],
      enum: ['user', 'partner', 'admin'],
      default: ['user']
    }
  },
  {
    timestamps: true,
    collection: 'User'
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
