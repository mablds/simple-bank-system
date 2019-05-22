const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()

// Body-parse pra trabalhar com json (Middleware)
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: false})) 

const route = router.get('/', (req, res, next) => {
    console.log('Get requested')
    res.status(200).send('hello world' + {
        title: "Simple-Bank-System",
        version: "0.0.1"
    })
})

const create = router.post('/', (req, res, next) => {
    console.log('Post requested')
    res.status(201).send(req.body)
    console.log(req.body)
})

const put = router.put('/:id', (req, res, next) => {
    console.log('Put received')
    const id = req.params.id
    res.status(200).send({
        id: id,
        item: req.body
    })
    console.log({
        "id": id,
        "item": req.body
    })
    console.log('Put answered')
})

const del = router.delete('/', (req, res, next) => {
    console.log('Post requested')
    res.status(200).send(req.body)
    console.log(req.body)
})

app.use('/', route)
app.use('/account', create)
app.use('/account', put)

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