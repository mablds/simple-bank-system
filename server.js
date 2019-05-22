const express = require('express')
const app = express()
const port = normalizePort(process.env.PORT) || process.argv[2] || 3000

// Body-parse pra trabalhar com json
// app.use(express.json()) 


app.get('/', (req, res) => {
    console.log('Get requested')
    res.send('hello world')
})

// Quando não pertencer a nenhuma rota configurada ...
app.use('*', (req, res) => {
    console.log('Route not listed. Bad Use.')
    res.send('404')
})

// Listener da porta
app.listen(port, () => {
    console.log(' SERVER ON! Escutando a porta: ' + port + ' ...')
})

// Se erro no express(), retornar a função de erro.
app.on('error', onError)


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


