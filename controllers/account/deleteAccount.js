const Account = require('../../models/account-model')

module.exports.deleteOne = async(req, res) => {
    if (!req.body.conta) res.send('Body inválido. Informações insuficientes')
    try {
        const accountToExclude = req.body.conta ? req.body.conta : req.body.titular
        console.log(accountToExclude)
        const bla = await Account.findOneAndDelete({ conta: req.body.conta })
        res.send('Conta excluída!')
    } catch (err) {
        res.send('err')
    }
}