require('./models/User')
require('./models/Order')
require('./models/Enquirey')
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

// Run Express
const app = express()

require('./startup/routes')(app)
require('./startup/db')()

// Handlebars middleware
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Production Setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
// Server Port
const port = process.env.PORT || 5000
const server = app.listen(port, () => console.log(`Listening on port ${port}`))
module.exports = server
