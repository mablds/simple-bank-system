const express = require('express')
const app = express()
const router = express.Router()
const port = process.argv[2] || 3000
const bodyParser = require('body-parser')
const monguin = require('./models/monguinho')

// Se erro no express(), retornar a função de erro.
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// Rotas
// Consulta de conta por titular
app.post('/teste', async(req, res) => {
    try {
        const consulted = await monguin.readOneByParameter({ "name": req.body.titular }, "bank", "cliente")
        console.log('Method: POST\nRequest: ' + JSON.stringify(req.body) + '\nAccount-DB: ' + JSON.stringify(consulted) + '\n            -----   -----')
        res.redirect('http://localhost:3000/')
    } catch (err) {
        return err
    }
})
app.post('/balance', async(req, res) => {
    try {
        const consulted = await monguin.readOneByParameter({ "name": req.body.titular }, "bank", "cliente")
        console.log('Method: POST\nRequest: ' + JSON.stringify(req.body) + '\nAccount-DB: ' + JSON.stringify(consulted) + '\n            -----   -----')
        consulted.forEach(el => {
            console.log(el.name + ', o saldo disponível da conta é: R$' + el.balance + '\n            -----   -----')
            res.redirect('http://localhost:3000/')
        })
    } catch (err) {
        return err
    }

})
app.post('/sqdp', async(req, res) => {
    if (req.body.operation === 'saque') {
        try {
            const consulta = await monguin.readOneByParameter({ "name": req.body.titular }, "bank", "cliente")
            const valorSaque = consulta[0].balance - req.body.valor
            await monguin.update({ "name": req.body.titular }, { $set: { 'balance': valorSaque } }, "bank", "cliente")
            console.log('Method: POST\nRequest: ' + JSON.stringify(req.body) + '\nAccount-DB: ' + JSON.stringify(consulta[0]) + '\n            -----   -----')
            console.log('Valor após o Saque: ' + JSON.stringify(await monguin.readOneByParameter({ "name": req.body.titular }, "bank", "cliente")))
            res.redirect('http://localhost:3000/')
        } catch (err) {
            return err
        }
    }
    if (req.body.operation === 'deposito') {
        try {
            const consulta = await monguin.readOneByParameter({ "name": req.body.titular }, "bank", "cliente")
            const valorSaque = consulta[0].balance + req.body.valor
            await monguin.update({ "name": req.body.titular }, { $set: { 'balance': valorSaque } }, "bank", "cliente")
            console.log('Method: POST\nRequest: ' + JSON.stringify(req.body) + '\nAccount-DB: ' + JSON.stringify(consulta[0]) + '\n            -----   -----')
            console.log('Valor após o Depósito: ' + JSON.stringify(await monguin.readOneByParameter({ "name": req.body.titular }, "bank", "cliente")))
            res.redirect('http://localhost:3000/')
        } catch (err) {
            return err
        }
    }
})
app.post('/transf', async(req, res) => {
    try {
        const consulta = await monguin.readOneByParameter({ "name": req.body.titular }, "bank", "cliente")
        const consulta2 = await monguin.readOneByParameter({ "name": req.body.titularfinal }, "bank", "cliente")
        if (consulta2) {
            const valorTransfSq = consulta[0].balance - req.body.valor
            const valorTransfDp = consulta2[0].balance + req.body.valor
            await monguin.update({ "name": req.body.titular }, { $set: { 'balance': valorTransfSq } }, "bank", "cliente")
            await monguin.update({ "name": req.body.titularfinal }, { $set: { 'balance': valorTransfDp } }, "bank", "cliente")
            console.log('Transferência concluída.')
            res.redirect('http://localhost:3000/')
        } else {
            alert('Destinatário inválido')
            res.redirect('http://localhost:3000/')
        }
    } catch (err) {
        return err
    }
})

// Listener da porta
app.listen(port, () => {
    console.log(' ----------------------\n|      SERVER ON!      |\n|      Porta: ' + port + '     |\n ----------------------')
})

// FUNCTION QUE TRAZ MAIS DETALHES SOBRE ERROS DE PRIVILEGIOS, ETC.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges')
            process.exit(1)
            break
        case 'EADDINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}