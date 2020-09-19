const express = require('express')

// Import routes
const user = require('../routes/api/user')
const order = require('../routes/api/order')
const validate = require('../routes/api/validate')
const enquirey = require('../routes/api/enquirey')

module.exports = (app) => {
  // Express middleware
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  // Use routes
  app.use('/api/user', user)
  app.use('/api/order', order)
  app.use('/api/validate', validate)
  app.use('/api/enquirey', enquirey)
}
