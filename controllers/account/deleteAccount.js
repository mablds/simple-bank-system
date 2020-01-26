const Account = require('../../models/account-model')

module.exports = async(req, res) => {
    if (!req.body.account) res.send('Body inválido. Informações insuficientes')
    try {
        const accountToExclude = req.body.account ? req.body.account : req.body.owner
        console.log(accountToExclude)
        const bla = await Account.findOneAndDelete({ account: req.body.account })
        res.send('conta excluída!')
    } catch (err) {
        res.send('err')
    }
}