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
    console.log(' SERVER ON! Escutando a porta: '+port+' ...')
})


// FUNCTION QUE CONSULTA AS VARIÁVEIS QUE O EDGE SETA POR PADRÃO (ELE VERIFICA AS PORTAS DISPONÍVEIS).
function normalizePort(val){
    const port1 = parseInt(val, 10)
    if(isNaN(port1))
        return val
    if(port1 >= 0)
        return port1
    return false;
}