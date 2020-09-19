const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateEmailInput(email) {
  let errors = {}

  email = !isEmpty(email) ? email : ''

  if (!Validator.isEmail(email)) {
    errors.email = `'Email address' is invalid`
  }

  if (Validator.isEmpty(email)) {
    errors.email = `'Email address' field is required`
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
