const express = require('express')
const mongoose = require('mongoose')
const Attribute = mongoose.model('Attribute')
const requireAuth = require('../../../middlewares/requireAuth')

const router = express.Router()

// @route  GET /api/attribute/status
// @desc   Get all current users attributes length
// @access Private
router.get('/status', requireAuth, async (req, res) => {
  const attribute = await Attribute.find({ _user: req.user.id })
  const attributeCount = Object.keys(attribute).length
  const attributeLength = new String(attributeCount)
  res.send(attributeLength)
})

// @route  GET /api/attribute/
// @desc   Get all current users attributes
// @access Private
router.get('/', requireAuth, async (req, res) => {
  const attribute = await Attribute.find({ _user: req.user.id })
  res.send(attribute)
})

// @route  GET /api/attribute/:id
// @desc   Get one current user attribute
// @access Private
router.get('/:id', requireAuth, async (req, res) => {
  const attribute = await Attribute.findById(req.params.id)
  if (!attribute)
    return res.status(404).send({ error: `'Attribute' requested not found` })
  res.send(attribute)
})

// @route  POST /api/attribute/
// @desc   Post a attribute
// @access Private
router.post('/', requireAuth, async (req, res) => {
  // Query unique
  let queryInput = req.body.attribute
  let queryDB = await Attribute.find({ _user: req.user.id })
  let usersAttributes = queryDB.map((query) => {
    return query.attribute
  })
  let compare = usersAttributes.find((att) => {
    return att === queryInput
  })
  if (queryInput.length < 1) {
    res.status(411).json({ error: `'Attribute' is required` })
    return
  }
  if (compare) {
    res.status(406).json({ error: `'Attribute' unique query failed` })
    return
  }
  // Create attribute
  const attribute = new Attribute({
    _user: req.user.id,
    ...req.body,
  })
  await attribute.save()
  res.send(attribute)
})

// @route  PATCH /api/attribute/:id
// @desc   Update an attribute
// @access Private
router.patch('/:id', requireAuth, async (req, res) => {
  // Query unique
  let queryInput = req.body.attribute
  let attributeSelected = await Attribute.findById(req.params.id)
  let queryDB = await Attribute.find({ _user: req.user.id })
  let usersAttributes = queryDB.map((query) => {
    return query.attribute
  })
  let compare = usersAttributes.find((att) => {
    return att === queryInput
  })
  if (!attributeSelected) {
    res.status(404).json({ error: `'Attribute' requested not found` })
    return
  }
  if (queryInput === attributeSelected.attribute) {
    res.status(406).json({ error: `'Attribute' unique query failed` })
    return
  }
  if (compare) {
    await Attribute.findByIdAndRemove(req.params.id)
    res.status(406).json({ error: `'Attribute' unique query failed` })
    return
  }
  if (queryInput.length < 1) {
    res.status(411).json({ error: `'Attribute' is required` })
    return
  }
  // Do update
  const attribute = await Attribute.findByIdAndUpdate(
    req.params.id,
    {
      _user: req.user.id,
      lastUpdate: new Date(),
      ...req.body,
    },
    { new: true }
  )
  res.send(attribute)
})

// @route  DELETE /api/attribute/:id
// @desc   Delete attribute
// @access Private
router.delete('/:id', requireAuth, async (req, res) => {
  const attribute = await Attribute.findByIdAndRemove(req.params.id)
  if (!attribute) {
    res.status(404).json({ error: `'Attribute' requested not found` })
    return
  }
  // Return deleted attribute
  res.send(attribute)
})

module.exports = router
