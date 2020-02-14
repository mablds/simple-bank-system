const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    account: {
        type: Number,
        required: true,
        unique: true,
    },
    owner: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        default: 0,
        required: true,
        trim: true,
    },
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Account', AccountSchema);
