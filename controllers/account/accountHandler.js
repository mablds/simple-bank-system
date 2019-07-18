const express = require('express'),
    router = express.Router()

//CRUD functions
const getAllAccounts = require('./getAllAccounts')
const getAccount = require('./getAccount.js')
const createAccount = require('./createAccount')
const updateAccount = require('./updateAccount.js')
const deleteAccount = require('./deleteAccount.js')

//Routes and Middlewares
router.get('/', getAllAccounts.getAll)
router.post('/', getAccount.getOne)
router.post('/create', createAccount.create)
router.delete('/', deleteAccount.deleteOne)


exports.router = router