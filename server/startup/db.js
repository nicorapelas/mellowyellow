const mongoose = require('mongoose')

// DB Keys
const db = require('../config/keys').keys

module.exports = () => {
  //Connect to Mongodb
  mongoose.connect(db.mongo.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
  })
  mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err)
  })
}
