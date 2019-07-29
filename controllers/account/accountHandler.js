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
router.post('/criar', createAccount.create)
router.post('/deposito', updateAccount.deposita)
router.post('/saque', updateAccount.saque)
router.put('/transferir', updateAccount.trasnfere)
router.delete('/delete', deleteAccount.deleteOne)


exports.router = router