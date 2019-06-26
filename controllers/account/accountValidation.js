const Account = require('../../models/account-model')
const mongoose = require('mongoose')
const express = require('express'),
    router = express.Router()

router.post('/', async(req, res) => {
    const verifyAccount = await (Account.find({ titular: req.body.titular, senha: req.body.senha }))

    if (verifyAccount.length !== 0) {
        res.send(verifyAccount)
    } else {
        console.log('titular: ' + req.body.titular + '\nsenha: ' + req.body.senha + '\n non ecsiste')
        res.send('Usuário ou senha não existem. TENTAR NOVAMENTE || REGISTRE-SE')
    }
})



exports.router = router