const express = require('express')
const mongoose = require('mongoose')
const Enquirey = mongoose.model('Enquirey')
const MailerEnquirey = require('../../services/MailerEnquirey')
const enquireyEmail = require('../../templates/enquirey')
const validateEnquireyForm = require('../../validation/enquirey')

const router = express.Router()

// @route  POST /api/enquirey/
// @desc   Post an enquirey
// @access Public
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body
  const emailHQ = 'nicorapelas@protonmail.com'
  const { errors, isValid } = validateEnquireyForm(name, email, phone, message)
  if (!isValid) {
    res.json({ error: errors })
    return
  }
  try {
    const newEnquirey = new Enquirey({
      name,
      email,
      phone,
      message,
      recipients: { email: emailHQ },
      created: Date.now(),
    })
    const mailer = new MailerEnquirey(newEnquirey, enquireyEmail(newEnquirey))
    await mailer.send()
    await newEnquirey.save()
    res.json({ success: 'Enquirey sent' })
    return
  } catch (error) {
    res.json(error.message)
    return
  }
})

module.exports = router
