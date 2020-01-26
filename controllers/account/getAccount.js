const Account = require('../../models/account-model')

module.exports.getOne = async(req, res) => {
    if (!req.params.account) res.send('Parâmetros vazios. Informe uma conta válida.')
    try {
        const account = await Account.findOne({ account: req.params.account })
        res.send(account)
    } catch (err) {
        res.send(err)
    }
}