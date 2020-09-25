const axios = require('axios')
const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')
const Order = mongoose.model('Order')
const User = mongoose.model('User')
const keys = require('../../config/keys').keys
const MailerOrder = require('../../services/MailerOrder')
const orderEmail = require('../../templates/order')
const validateEmailInput = require('../../validation/email')

const router = express.Router()

// @route  POST /api/order/
// @desc   Get all current users orders
// @access Public
router.post('/all', async (req, res) => {
  const { email } = req.body
  const { errors, isValid } = validateEmailInput(email)
  if (!isValid) {
    res.json({ error: errors })
    return
  }
  const order = await Order.find({ email })
  if (!order) {
    res.json({ error: { order: `'Order' not found` } })
    return
  }
  return res.send(order)
})

// Signature generator for PayFast
const generateSignature = (data, passPhrase = '') => {
  // Create parameter string
  let pfOutput = ''
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== '') {
        pfOutput += `${key}=${encodeURIComponent(data[key]).replace(
          /%20/g,
          ' + '
        )}&`
      }
    }
  }
  // Remove last ampersand
  let getString = pfOutput.slice(0, -1)
  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(
      /%20/g,
      '+'
    )}`
  }
  return crypto.createHash('md5').update(getString).digest('hex')
}

const dataToString = (dataArray) => {
  // Convert your data array to a string
  let pfParamString = ''
  for (let key in dataArray) {
    if (dataArray.hasOwnProperty(key)) {
      pfParamString += `${key}=${encodeURIComponent(dataArray[key]).replace(
        /%20/g,
        '+'
      )}&`
    }
  }
  // Remove last ampersand
  return pfParamString.slice(0, -1)
}

const generatePaymentIdentifier = async (pfParamString) => {
  const result = await axios
    .post(`https://www.payfast.co.za/onsite/process`, pfParamString)
    .then((res) => {
      return res.data.uuid || null
    })
    .catch((error) => {
      console.error(error)
    })
  console.log('res.data', result)
  return result
}

// @route  POST /api/order/pa
// @desc   Arrange payment data for an order
// @access Public
router.post('/pay', async (req, res) => {
  const { name_first, name_last, email_address, amount, item_name } = req.body
  const myData = {
    merchant_id: keys.payFast.MerchantID,
    merchant_key: keys.payFast.MerchantKey,
    return_url: 'https://0c7286ba5195.ngrok.io/order/paid',
    cancel_url: 'https://0c7286ba5195.ngrok.io/order/not-paid',
    notify_url: 'https://0c7286ba5195.ngrok.io/order/payment-note',
    name_first,
    name_last,
    email_address,
    amount,
    item_name,
  }
  const passPhrase = 'HappyChappy-007'
  myData['signature'] = generateSignature(myData, passPhrase)
  const pfParamString = dataToString(myData)
  const identifier = await generatePaymentIdentifier(pfParamString)

  return res.send(identifier)
})

// // @route  POST /api/order/pa
// // @desc   Arrange payment data for an order
// // @access Public
// router.post('/pay', async (req, res) => {
//   const { name_first, name_last, email_address, amount, item_name } = req.body
//   const payFastRequest = {
//     merchant_id: 10019952,
//     merchant_key: 'di2hra235gprh',
//     return_url: 'https://0c7286ba5195.ngrok.io/order/paid',
//     cancel_url: 'https://0c7286ba5195.ngrok.io/order/not-paid',
//     notify_url: 'https://0c7286ba5195.ngrok.io/order/payment-note',
//     name_first,
//     name_last,
//     email_address,
//     amount,
//     item_name,
//   }
//   const MD5Signature = generateSignature(payFastRequest, 'HappyChappy-007')

//   return res.json({
//     merchant_id: 10019952,
//     merchant_key: 'di2hra235gprh',
//     return_url: 'https://0c7286ba5195.ngrok.io/order/paid',
//     cancel_url: 'https://0c7286ba5195.ngrok.io/order/not-paid',
//     notify_url: 'https://0c7286ba5195.ngrok.io/order/payment-note',
//     name_first,
//     name_last,
//     email_address,
//     amount,
//     item_name,
//     signature: MD5Signature,
//   })
// })

router.get('/paid', async (req, res) => {
  console.log(`@ paid`)
  console.log(req)
})
router.get('/not-paid', async (req, res) => {
  console.log(`@ not-paid`)
  console.log(req)
})
router.get('/payment-note', async (req, res) => {
  console.log(`@ payment-note`)
  console.log(req)
})

// @route  POST /api/order/
// @desc   Post an order
// @access Public
router.post('/hq', async (req, res) => {
  const {
    email,
    ointmentQuantity,
    oilQuantity,
    comboQuantity,
    totalPrice,
  } = req.body
  const user = await User.findOne({ email })
  const {
    firstName,
    lastName,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    province,
    postalCode,
  } = user
  const emailHQ = 'nicorapelas@protonmail.com'
  try {
    const newOrder = new Order({
      firstName,
      lastName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      email,
      ointmentQuantity,
      oilQuantity,
      comboQuantity,
      totalPrice,
      recipients: { email: emailHQ },
      created: Date.now(),
    })
    const mailerOrder = new MailerOrder(newOrder, orderEmail(newOrder))
    await mailerOrder.send()
    res.json(newOrder)
    return
  } catch (error) {
    res.json(error.message)
    return
  }
})

// @route  POST /api/order/
// @desc   Post an order
// @access Public
router.post('/', async (req, res) => {
  const {
    email,
    ointmentQuantity,
    oilQuantity,
    comboQuantity,
    totalPrice,
  } = req.body
  const user = await User.findOne({ email })
  const {
    firstName,
    lastName,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    province,
    postalCode,
  } = user
  try {
    const newOrder = new Order({
      firstName,
      lastName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      province,
      postalCode,
      email,
      ointmentQuantity,
      oilQuantity,
      comboQuantity,
      totalPrice,
      recipients: { email },
      created: Date.now(),
    })
    const mailerOrder = new MailerOrder(newOrder, orderEmail(newOrder))
    await mailerOrder.send()
    await newOrder.save()
    res.json(newOrder)
    return
  } catch (error) {
    res.json(error.message)
    return
  }
})

module.exports = router
