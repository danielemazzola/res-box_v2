const mongoose = require('mongoose')

const partnerSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    cif: { type: String, trim: true, required: true },
    owner_name: { type: String, trim: true, required: true },
    owner_lastname: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    bank_name: { type: String, trim: true, required: true },
    bank_number: { type: String, trim: true, required: true },
    avatar: {
      type: String,
      required: false,
      default:
        'https://cdn.pixabay.com/photo/2018/08/30/16/57/coffee-3642712_1280.png'
    },
    banner: {
      type: String,
      required: false,
      default:
        'https://www.shutterstock.com/image-photo/various-asian-meals-on-rustic-600nw-1125066479.jpg'
    },
    city: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    coordinate_x: { type: String, trim: true, default: '0' },
    coordinate_y: { type: String, trim: true, default: '0' },
    users: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    confirmed: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    collection: 'Partner'
  }
)

const Partner = mongoose.model('Partner', partnerSchema)
module.exports = Partner
