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
    // const consulted = await monguin.update({ "name": req.body.titular }, { "name": req.body.titular, "balance":} "bank", "cliente")
    // console.log('Method: GET\nRequest: ' + requested + '\nAccount-DB: ' + JSON.stringify(consulted) + '\n            -----   -----')
    // consulted.forEach(el => {
    //     res.send(el.name + ', o saldo disponível da conta é: R$' + el.balance)
    // })
    console.log(req.body)
})
app.get('/rapaz', async(req, res) => {
    res.send('rapaz')
})

// Listener da porta
app.listen(port, () => {
    console.log(' ----------------------\n|      SERVER ON!      |\n|      Porta: ' + port + '     |\n ----------------------')
})

// FUNCTION QUE CONSULTA AS VARIÁVEIS QUE O EDGE SETA POR PADRÃO (ELE VERIFICA AS PORTAS DISPONÍVEIS).
function normalizePort(val) {
    const port1 = parseInt(val, 10)
    if (isNaN(port1))
        return val
    if (port1 >= 0)
        return port1
    return false;
}

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