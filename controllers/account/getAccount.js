const Account = require('../../models/account-model')

module.exports.getOne = async(req, res) => {
    if (!req.body.titular) res.send('Body vazio. Informe uma conta.')
    try {
        const account = await Account.findOne({ conta: req.body.conta })
        res.send({
            conta: account.conta,
            id: account._id,
            titular: account.titular,
            saldo: account.saldo
        })
    } catch (err) {
        res.send(err)
    }
}