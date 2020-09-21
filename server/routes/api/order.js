const axios = require('axios')
const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')
const Order = mongoose.model('Order')
const PayFastRequest = mongoose.model('PayFastRequest')
const User = mongoose.model('User')
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
        pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(
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

  console.log(`at getString: ${getString}`)
  return crypto.createHash('md5').update(getString).digest('hex')
}

// @route  POST /api/order/pa
// @desc   Arrange payment data for an order
// @access Public
router.post('/pay', async (req, res) => {
  const { name_first, name_last, email_address, amount, item_name } = req.body
  const payFastRequest = new PayFastRequest({
    merchant_id: 10000100,
    merchant_key: '46f0cd694581a',
    return_url: 'https://e2662d82348f.ngrok.io/order/paid',
    cancel_url: 'https://e2662d82348f.ngrok.io/order/not-paid',
    notify_url: 'https://e2662d82348f.ngrok.io/order/payment-note',
    name_first,
    name_last,
    email_address,
    amount,
    item_name,
    passphrase: 'HappyChappy-007',
  })

  // Create an MD5 signature of it.
  const payFastSubmitData = `merchant_id=${payFastRequest.merchant_id}&merchant_key=${payFastRequest.merchant_key}&return_url=${payFastRequest.return_url}&cancel_url=${payFastRequest.cancel_url}&notify_url=${payFastRequest.notify_url}&name_first=${payFastRequest.name_first}&name_last=${payFastRequest.name_last}&email_address=${payFastRequest.email_address}&amount=${payFastRequest.amount}&item_name=${payFastRequest.item_name}&${payFastRequest.passphrase}`

  console.log(payFastSubmitData)

  const MD5Signature = generateSignature(
    payFastSubmitData.toString(),
    payFastRequest.passphrase
  )

  console.log(MD5Signature)

  return res.json({
    merchant_id: 10000100,
    merchant_key: '46f0cd694581a',
    return_url: 'https://e2662d82348f.ngrok.io/order/paid',
    cancel_url: 'https://e2662d82348f.ngrok.io/order/not-paid',
    notify_url: 'https://e2662d82348f.ngrok.io/order/payment-note',
    name_first,
    name_last,
    email_address,
    amount,
    item_name,
    passphrase: 'HappyChappy-007',
    signature: MD5Signature,
  })
})

router.get('/paid', async (req, res) => {
  console.log(`paid`)
})
router.get('/not-paid', async (req, res) => {
  console.log(`not-paid`)
})
router.get('/payment-note', async (req, res) => {
  console.log(`payment-note`)
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
