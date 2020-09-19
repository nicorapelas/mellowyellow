const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const validateCheckoutForm = require('../../validation/checkout')

const router = express.Router()

// @route  POST /api/validate/delivery-form
// @desc   Create a user
// @access Public
router.post('/delivery-form', async (req, res) => {
  const {
    email,
    phoneNumber,
    firstName,
    lastName,
    addressLine1,
    city,
    postalCode,
  } = req.body
  const { errors, isValid } = validateCheckoutForm(
    email,
    phoneNumber,
    firstName,
    lastName,
    addressLine1,
    city,
    postalCode
  )
  if (!isValid) {
    res.json({ error: errors })
    return
  }
  res.json({ success: `All fields good` })
  return
})

module.exports = router
