const mongoose = require('mongoose')

module.exports = mongoose.model('Account', {
    conta: {
        type: Number,
        required: true,
        unique: true,
    },
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