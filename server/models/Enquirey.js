const mongoose = require('mongoose')
const RecipientSchema = require('./Recipient')

const enquireySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  recipients: [RecipientSchema],
  created: {
    type: Date,
    default: Date.now,
  },
})

mongoose.model('Enquirey', enquireySchema)
