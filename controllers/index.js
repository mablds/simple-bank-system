// Express imports
const express = require('express'),
    router = express.Router()

// Middlewares for entire routes
const logMiddleware = require('../middlewares/logger.js')
const accountHandler = require('./account/accountHandler')
const accountValidation = require('./account/accountValidation')

// Routes in use
router.use('/bank', logMiddleware, accountValidation.router)
router.use('/register', logMiddleware, accountHandler.router)
router.use('/', logMiddleware, (req, res) => {
    res.send('BEM VINDO AO BANCO, OTÁRIO')
})


// 404 setup
router.use('*', (req, res) => {
    res.status(404).send('Page Not Found')
})

module.exports = router