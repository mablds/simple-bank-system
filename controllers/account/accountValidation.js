const Account = require('../../models/account-model')
const mongoose = require('mongoose')
const express = require('express'),
    router = express.Router()

router.post('/', async(req, res) => {
    const verifyAccount = await (Account.find({ titular: req.body.titular, senha: req.body.senha }))
        // console.log(verifyAccount)
    if (verifyAccount[0].titular === req.body.titular) {
        console.log(verifyAccount)
    } else {
        console.log('non ecsiste')
    }
})



exports.router = router