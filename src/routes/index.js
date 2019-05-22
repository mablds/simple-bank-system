const express = require('express')
const app = express()
const router = express.Router()


// Rota base. Teste.
router.get('/', (req, res, next) => {
    console.log('Get requested')
    res.send('HELLO USER - TRY ANY DIFFERENT ROUTES TO DO THE METHODS WITH YOUR ACCOUNT')
})

module.exports = router