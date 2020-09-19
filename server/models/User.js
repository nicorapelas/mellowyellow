const mongoose = require('mongoose')
const RecipientSchema = require('./Recipient')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  loyaltyStamps: {
    type: Number,
    default: 0,
  },
  voucher: {
    type: Number,
    default: 0,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
  },
  province: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  recipients: [RecipientSchema],
  created: {
    type: Date,
    default: Date.now,
  },
})

mongoose.model('User', userSchema)
