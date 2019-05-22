const app = require('../src/app')
const port = normalizePort(process.env.PORT) || process.argv[2] || 3000

// Se erro no express(), retornar a função de erro.
app.on('error', onError)

// Listener da porta
app.listen(port, () => {
    console.log(' -- SERVER ON! -- \nPorta: ' + port + ' ...')
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


