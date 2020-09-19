const express = require('express')
const mongoose = require('mongoose')
const async = require('async')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = mongoose.model('User')
const keys = require('../../config/keys').keys
const requireAuth = require('../../middlewares/requireAuth')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const validateEmailInput = require('../../validation/email')
const validatePasswordReset = require('../../validation/passwordReset')
const resetPasswordEmail = require('../../templates/mailTemplates/resetPasswordEmail')
const MailerAuth = require('../../services/MailerAuth')
const verifyEmail = require('../../templates/mailTemplates/verifyEmail')

const router = express.Router()

// @route  POST /auth/user/fetch-user
// @desc   Fetch current user
// @access public
router.get('/fetch-user', requireAuth, (req, res) => {
  console.log(req.user)
  res.send(req.user)
})

// @route  POST /auth/user/register
// @desc   Register a user and respond with JWT
// @access public
router.post('/register', async (req, res) => {
  // Validation check
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) return res.send({ error: errors })
  // Check if User exists
  const userCheck = await User.findOne({ email: req.body.email })
  if (userCheck) {
    errors.email = 'Email already in use'
    return res.send({ error: errors })
  }
  const { email, password, fullName } = req.body
  try {
    // Create user
    const newUser = new User({
      email,
      password,
      localId: true,
      recipients: { email },
      created: Date.now(),
    })
    // Send verification email
    const mailer = new MailerAuth(newUser, verifyEmail(newUser))
    await mailer.send()
    await newUser.save()
    await newContactInfo.save()
    return res.send({
      success: `An 'email verification' email has been sent to you.`,
    })
  } catch (err) {
    return res.send(err.message)
  }
})

// @route  GET /auth/user/login
// @desc   Login a user and respond with JWT
// @access public
router.post('/login', async (req, res) => {
  // Validation check
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) return res.send({ error: errors })
  const { email, password } = req.body
  // Check if user with email registered
  const user = await User.findOne({ email })
  if (!user) {
    errors.email = 'Invalid email or password'
    return res.send({ error: errors })
  }
  if (user.googleId) {
    return res.send({
      error: {
        warn: `You've previously registered using Google, please login using Google`,
      },
    })
  }
  if (user.facebookId) {
    return res.send({
      error: {
        warn: `You've previously registered using Facebook, please login using Facebook`,
      },
    })
  }
  // Check if users email verified
  if (!user.emailVerified)
    return res.send({
      error: { notVerified: 'Email address not yet verified' },
    })
  try {
    await user.comparePassword(password)
    const token = jwt.sign({ userId: user._id }, keys.JWT.secret)
    res.send({ token })
  } catch (err) {
    errors.password = 'Invalid email or password'
    return res.send({ error: errors })
  }
})

// @route  Get /auth/user/email-verified/:id
// @desc   Set emailVerified to true
// @access public
router.get('/email-verify/:id', async (req, res) => {
  req.body

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      emailVerified: true,
    },
    { new: true }
  )
  if (!user) return res.status(404).send('"User-status" requested not found')
  res.render('authSuccess', {
    message: 'Email address verified',
  })
})

// @route  POST /auth/user/resend-verification-email
// @desc   Resend verification email
// @access public
router.post('/resend-verification-email', async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  const newUser = new User({
    _id: user._id,
    recipients: { email },
  })
  // Send verification email
  const mailer = new MailerAuth(newUser, verifyEmail(newUser))
  try {
    await mailer.send()
    return res.send({
      success: `An 'email verification' email has been sent to you.`,
    }) // Add handlebars template for this when you have a frontend
  } catch (err) {
    res.status(422).send(err)
  }
})

// @route  POST /auth/user/forgot
// @desc   Post to forgot password
// @access public
router.post('/forgot', (req, res) => {
  async.waterfall([
    (done) => {
      crypto.randomBytes(20, (err, buf) => {
        const token = buf.toString('hex')
        done(err, token)
      })
    },
    (token, done) => {
      const { email } = req.body
      const { errors, isValid } = validateEmailInput(email)
      if (!isValid) return res.send({ error: errors })
      User.findOne({ email }, (err, user) => {
        if (!user) {
          errors.email = 'Email address not registered'
          return res.send({ error: errors })
        }
        if (user.googleId) {
          return res.send({
            error: {
              warn: `You've previously registered using Google, please login using Google`,
            },
          })
        }
        if (user.facebookId) {
          return res.send({
            error: {
              warn: `You've previously registered using Facebook, please login using Facebook`,
            },
          })
        }
        user.recipients = { email }
        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 3600000
        user.save((err) => {
          done(err, token, user)
        })
      })
    },
    async (token, user) => {
      // Send email for verification and save user
      const mailer = new MailerAuth(user, resetPasswordEmail(token, user))
      try {
        await mailer.send()
        return res.send({
          success: `A "password reset" email was sent to you. Please view the email and click on the provided "Reset password"
        link, within the email.`,
        })
      } catch (err) {
        res.status(422).send(err)
      }
    },
  ])
})

router.get('/reset/:token', (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    (err, user) => {
      if (!user) {
        return res.render('authError')
      }
      return res.render('passwordResetForm', {
        token: req.params.token,
        url: keys.authPrefix.url,
      })
    }
  )
})

router.post('/reset/:token', (req, res) => {
  async.waterfall(
    [
      (done) => {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          (err, user) => {
            if (!user) {
              ;`error at password reset`
              res.render('authError')
            }
            // Validation check
            const { password, pasword2 } = req.body
            const { errors, isValid } = validatePasswordReset(req.body)
            if (!isValid) {
              return res.render('passwordResetForm', {
                token: req.params.token,
                url: keys.authPrefix.url,
                password,
                pasword2,
                errorsPassword: errors.password,
                errorsPassword2: errors.password2,
              })
            }
            user.password = req.body.password
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
            user
              .save()
              .then(
                res.render('authSuccess', {
                  message: 'Password reset successfully',
                })
              )
              .catch((err) => err)
          }
        )
      },
    ],
    (err) => {
      res.render('authError')
    }
  )
})

module.exports = router

// Make template for expired email verification token
