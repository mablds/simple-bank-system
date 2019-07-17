const Account = require('../../models/account-model')

module.exports.deleteOne = async(req, res) => {
    if (!req.body.id) res.send('Body inválido. Informações insuficientes')
    try {
        const idToExclude = req.body.id ? req.body.id : req.body.titular
        await Account.deleteOne({ _id: idToExclude })
        const bla = await Account.getOne({ _id: idToExclude })
    } catch (err) {
        res.send(err)
    }
}