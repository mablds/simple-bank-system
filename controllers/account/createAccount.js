const Account = require('../../models/account-model')

module.exports.create = async(req, res) => {
    await Account.create({})
}