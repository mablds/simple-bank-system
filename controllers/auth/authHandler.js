const express = require('express'),
    router = express.Router()

const verifAccount = require('./verifAccount')

//rotas em uso:
router.post('/', verifAccount.findByAccount)

exports.router = router