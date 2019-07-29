require('dotenv').config()
require('./models/mongoose')
console.log(process.env.BLA)

const config = require('./config/config')
const port = process.env.PORT || 3000
const app = config.setUpServer()


app.listen(port, () => {
    console.log(' ----------------------\n|      SERVER ON!      |\n|      Porta: ' + port + '     |\n ----------------------')
})