const Account = require('../../models/account-model')
const mongoose = require('mongoose')
const express = require('express'),
    router = express.Router()

router.get('/', async(req, res) => {
    const verifyAccount = Account.find({ titular: req.body.titular })
    console.log(verifyAccount)
})



exports.router = router