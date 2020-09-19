const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateEnquireyForm(name, email, phone, message) {
  let errors = {}

  name = !isEmpty(name) ? name : ''
  email = !isEmpty(email) ? email : ''
  phone = !isEmpty(phone) ? phone : ''
  message = !isEmpty(message) ? message : ''

  if (!Validator.isEmail(email)) {
    console.log(email)
    errors.email = `'email address' is invalid`
  }

  if (!Validator.isLength(phone, { min: 10, max: 12 })) {
    console.log(phone)
    errors.phone = `'phone number' is invalid`
  }

  if (Validator.isEmpty(email)) {
    errors.email = `'email address' is required`
  }

  if (Validator.isEmpty(phone)) {
    errors.phone = `'phone number' is required`
  }

  if (Validator.isEmpty(name)) {
    errors.name = `'name' is required`
  }
  if (Validator.isEmpty(message)) {
    errors.message = `'message' is required`
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
