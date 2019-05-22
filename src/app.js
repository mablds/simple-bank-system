const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//Carrega Rotas
const index = require('./routes/index')
const accounts = require('./routes/accounts')

// Body-parse pra trabalhar com json (Middleware)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false})) 
app.use('/', index)
app.use('/banking', accounts)
app.use('/account', accounts)

// Quando não pertencer a nenhuma rota configurada ...
app.use('*', (req, res) => {
    console.log('Route not listed. Bad Request.')
    res.send('404')
    // Erro 400 = Bad request
    // Erro 401 = Não autenticado
    // Erro 403 = Não autorizado
    // Erro 500 = Internal Error
})


module.exports = app