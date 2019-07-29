const express = require('express')
const path = require('path')
const pug = require('pug')

module.exports.setUpServer = () => {
    const app = express()
    const bodyParser = require('body-parser')

    app.set('view engine', 'pug')
    app.set("views", path.join(__dirname, "views"))

    const loggerMiddleware = require('../middlewares/logger')
        // app.use(loggerMiddleware)

    app.use("/static", express.static(path.join(__dirname, "public")))

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(require('../controllers'))

    return app
}