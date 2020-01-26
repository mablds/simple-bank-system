const express = require('express')
const router = express.Router()

//CRUD functions
const getAllAccounts = require('./getAllAccounts')
const getAccount = require('./getAccount.js')
const createAccount = require('./createAccount')
const updateAccount = require('./updateAccount.js')
const deleteAccount = require('./deleteAccount.js')

//Routes and Middlewares
router.get('/', getAllAccounts.getAll)
router.get('/:account', getAccount.getOne)
router.post('/create', createAccount)
router.post('/deposit', updateAccount.deposit)
router.post('/withdraw', updateAccount.withdraw)
router.put('/transfer', updateAccount.trasnfer)
router.delete('/delete', deleteAccount)


module.exports = router