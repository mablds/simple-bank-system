const mongoose = require('mongoose')

module.exports = mongoose.model('Account', {
    titular: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true
    },
    saldo: {
        type: Number,
        default: 0,
        required: true,
        trim: true,
    }
})