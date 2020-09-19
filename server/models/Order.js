const mongoose = require('mongoose')
const RecipientSchema = require('./Recipient')

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  ointmentQuantity: {
    type: Number,
    default: 0,
  },
  oilQuantity: {
    type: Number,
    default: 0,
  },
  comboQuantity: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  paid: {
    type: Boolean,
    default: false,
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

mongoose.model('Order', orderSchema)
