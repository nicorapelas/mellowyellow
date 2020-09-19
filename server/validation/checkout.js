const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateCheckoutForm(
  email,
  phoneNumber,
  firstName,
  lastName,
  addressLine1,
  city,
  postalCode
) {
  let errors = {}

  email = !isEmpty(email) ? email : ''
  phoneNumber = !isEmpty(phoneNumber) ? phoneNumber : ''
  firstName = !isEmpty(firstName) ? firstName : ''
  lastName = !isEmpty(lastName) ? lastName : ''
  addressLine1 = !isEmpty(addressLine1) ? addressLine1 : ''
  city = !isEmpty(city) ? city : ''
  postalCode = !isEmpty(postalCode) ? postalCode : ''

  if (!Validator.isEmail(email)) {
    errors.email = `'email address' is invalid`
  }

  if (!Validator.isLength(phoneNumber, { min: 10, max: 12 })) {
    errors.phoneNumber = `'phone number' is invalid`
  }

  if (Validator.isEmpty(email)) {
    errors.email = `'email address' is required`
  }

  if (Validator.isEmpty(phoneNumber)) {
    errors.phoneNumber = `'phone number' is required`
  }

  if (Validator.isEmpty(firstName)) {
    errors.firstName = `'first name' is required`
  }
  if (Validator.isEmpty(lastName)) {
    errors.lastName = `'last name' is required`
  }
  if (Validator.isEmpty(addressLine1)) {
    errors.addressLine1 = `'street address' is required`
  }
  if (Validator.isEmpty(city)) {
    errors.city = `'city' is required`
  }
  if (Validator.isEmpty(postalCode)) {
    errors.postalCode = `'postal code' is required`
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
