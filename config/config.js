const express = require('express')

module.exports.setUpServer = () => {
    const app = express()
    const bodyParser = require('body-parser')

    app.set('view engine', 'pug')

    app.use(express.static('../public'))

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(require('../controllers'))

    return app
}