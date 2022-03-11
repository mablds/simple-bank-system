// Express imports
const express = require('express')
const router = express.Router()

// Middlewares for entire routes
const logMiddleware = require('../middlewares/logger.js')

//logger middleware added
router.use(logMiddleware)

//Handlers
const accountHandler = require('./account/accountHandler')
const authHandler = require('./auth/authHandler')

// const path = require('path')

// Routes in use
router.use('/bank', accountHandler)
router.use('/auth', authHandler)
router.use('/', (_, res) => res.status(200).json({msg: 'Bem vindo à API de Sistema bancário'}))
router.use('*', (_, res) => res.status(404).json({msg: 'Página não encontrada'}))

module.exports = router