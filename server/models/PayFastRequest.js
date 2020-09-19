const mongoose = require('mongoose')

const payFastRequestSchema = new mongoose.Schema({
  merchant_id: {
    type: Number,
  },
  merchant_key: {
    type: String,
  },
  return_url: {
    type: String,
  },
  cancel_url: {
    type: String,
  },
  notify_url: {
    type: String,
  },
  name_first: {
    type: String,
  },
  name_last: {
    type: String,
  },
  email_address: {
    type: String,
  },
  amount: {
    type: String,
  },
  item_name: {
    type: String,
  },
  passphrase: {
    type: String,
  },
})

mongoose.model('PayFastRequest', payFastRequestSchema)
