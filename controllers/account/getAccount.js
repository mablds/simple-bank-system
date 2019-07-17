const Account = require('../../models/account-model')

module.exports.getOne = async(req, res) => {
    if (!req.body.titular) res.send('Body vazio. Informe uma conta.')
    try {
        const account = await Account.findOne({ titular: req.body.titular })
        res.send({
            id: account._id,
            titular: account.titular,
            saldo: account.saldo
        })
    } catch (err) {
        res.send(err)
    }
}