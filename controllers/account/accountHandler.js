const express = require('express'),
    router = express.Router()

//CRUD functions
const getAllAccounts = require('./getAllAccounts')
const getAccount = require('./getAccount.js')
const updateAccount = require('./updateAccount.js')
const deleteAccount = require('./deleteAccount.js')

router.get('/', getAllAccounts.getAll)
router.post('/', getAccount.getOne)
router.delete('/', deleteAccount.deleteOne)

exports.router = router