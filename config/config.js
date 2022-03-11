require('dotenv').config()
require('../models/mongoose').connect().catch(err => console.log(err))

const express = require('express')
const cors = require('cors')

module.exports.setUpServer = () => {
  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(require('../controllers'))

  return app
}