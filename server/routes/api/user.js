const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const validateEmailInput = require('../../validation/email')
const validateCheckoutForm = require('../../validation/checkout')

const router = express.Router()

// @route  POST /api/user/
// @desc   Get all current users data
// @access Public
router.post('/data', async (req, res) => {
  const { email } = req.body
  const { errors, isValid } = validateEmailInput(email)
  if (!isValid) {
    res.json({ error: errors })
    return
  }
  const user = await User.findOne({ email })
  if (!user) {
    res.json({ error: { email: `'Email address' not found` } })
    return
  }
  return res.send(user)
})

// @route  POST /api/user/
// @desc   Create a user
// @access Public
router.post('/', async (req, res) => {
  const {
    email,
    phoneNumber,
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    city,
    province,
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
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    const returnUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        ...req.body,
      },
      { new: true }
    )
    res.json(returnUser)
    return
  } else {
    try {
      const newUser = new User({
        email,
        phoneNumber,
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        city,
        province,
        postalCode,
        recipients: { email },
        created: Date.now(),
      })
      await newUser.save()
      res.json(newUser)
      return
    } catch (error) {
      res.json(error.message)
      return
    }
  }
})

module.exports = router
