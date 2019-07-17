const Account = require('../../models/account-model')

module.exports.trasnfere = async(req, res) => {
    const out = req.body.outTitular
    const inc = req.body.incTitular
    const value = req.body.value

    const outAccount = await Account.findOne({ titular: out })
    const incAccount = await Account.findOne({ titular: inc })

}