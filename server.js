const express = require('express')
const app = express()
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
    const requested = JSON.stringify(req.body.titular)
    const consulted = await monguin.readOneByParameter({ "name": req.body.titular }, "bank", "cliente")
    console.log('request: ' + requested + '\nAccount: ' + JSON.stringify(consulted))
    res.send(consulted)
})
app.get('/opr', async(req, res) => {
    // const requested = JSON.stringify(req.body.titular)
    const consulted = await monguin.readOneByParameter({ "name": req.body.titular }, "bank", "cliente")
    consulted.forEach(el => {
        res.send(el.name + ', o saldo disponível da conta é: R$' + el.balance)
    })
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