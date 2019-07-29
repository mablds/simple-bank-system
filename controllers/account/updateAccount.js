const Account = require('../../models/account-model')
const getAccount = require('./getAccount')

module.exports.trasnfere = async(req, res) => {
    if (!req.body.incConta || !req.body.outConta || !req.body.value) return res.send('Body inválido.')
    const out = req.body.outConta
    const inc = req.body.incConta
    const value = req.body.value
    console.log(req.body)

    const outAccount = await Account.findOne({ conta: out })
    const tira = outAccount.saldo - value
    const incAccount = await Account.findOne({ conta: inc })
    const recebe = incAccount.saldo + value
    try {
        await Account.findByIdAndUpdate(outAccount._id, { saldo: tira })
        await Account.findByIdAndUpdate(incAccount._id, { saldo: recebe })
        res.send('Transferência executada com sucesso.')
    } catch (err) {
        res.send(err)
    }
}

module.exports.deposita = async(req, res) => {
    if (!req.body.titular && !req.body.id && !req.body.conta && !req.body.value) return res.send('body inválido')
    let params
    let paramsType
    if (!req.body.titular && !req.body.id) {
        params = req.body.conta
        paramsType = { conta: params }
    } else if (!req.body.conta && !req.body.titular) {
        params = req.body.id
        paramsType = { _id: params }
    } else {
        params = req.body.titular
        paramsType = { titular: params }
    }
    const account = await Account.findOne(paramsType)
    const saldo = parseInt(account.saldo)
    const value = saldo + req.body.value
    await Account.where({ titular: account.titular }).update({ saldo: value })
    res.send('Depósito efetuado com sucesso!')
}


module.exports.saque = async(req, res) => {
    if (!req.body.titular && !req.body.id && !req.body.conta) return res.send('body inválido')
    if (!req.body.value) res.send('body inválido')
    let params
    let paramsType
    if (!req.body.titular && !req.body.id) {
        params = req.body.conta
        paramsType = { conta: params }
    } else if (!req.body.conta && !req.body.titular) {
        params = req.body.id
        paramsType = { _id: params }
    } else {
        params = req.body.titular
        paramsType = { titular: params }
    }

    const account = await Account.findOne(paramsType)
    const saldo = parseInt(account.saldo)
    const value = saldo - req.body.value
    await Account.where({ titular: account.titular }).update({ saldo: value })
    res.send('Saque efetuado com sucesso')
}