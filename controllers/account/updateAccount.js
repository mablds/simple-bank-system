const Account = require('../../models/account-model')

module.exports.trasnfer = async(req, res) => {
    if (!req.body.incAccount || !req.body.outAccount || !req.body.value) return res.send('Body inválido.')
    const out = req.body.outAccount
    const inc = req.body.incAccount
    const valueOfTransaction = req.body.value

    const accountTransferOut = await Account.findOne({ account: out })
    const transferWithdraw = accountTransferOut.value - valueOfTransaction
    const accountTransferInc = await Account.findOne({ account: inc })
    const transferDeposit = accountTransferInc.value + valueOfTransaction
    try {
        await Account.findByIdAndUpdate(accountTransferOut._id, { value: transferWithdraw })
        await Account.findByIdAndUpdate(accountTransferInc._id, { value: transferDeposit })
        res.send('Transferência executada com sucesso.')
    } catch (err) {
        res.send(err)
    }
}

module.exports.deposit = async(req, res) => {
    if (!req.body.owner && !req.body.account && !req.body.value) return res.send('body inválido')

    const account = await Account.findOne({ account: req.body.account })
    const saldo = parseInt(account.value)
    const valueAfterDeposit = saldo + req.body.value

    try {
        await Account.updateOne({ account: req.body.account }, { value: valueAfterDeposit })
        res.send('Depósito efetuado com sucesso!')
    } catch (error) {
        res.send(error)
    }
}

module.exports.withdraw = async(req, res) => {
    if (!req.body.owner && !req.body.account) return res.send('body inválido')
    if (!req.body.value) res.send('body inválido')
    let params
    let paramsType
    if (!req.body.owner && !req.body.id) {
        params = req.body.account
        paramsType = { account: params }
    } else if (!req.body.account && !req.body.owner) {
        params = req.body.id
        paramsType = { _id: params }
    } else {
        params = req.body.owner
        paramsType = { owner: params }
    }

    const account = await Account.findOne(paramsType)
    const withdrawValue = parseInt(account.value)
    const valueAfterWithdraw = withdrawValue - req.body.value

    try {
        await Account.updateOne({ owner: account.owner }, { value: valueAfterWithdraw })
        res.send('Saque efetuado com sucesso')
    } catch (error) {
        res.send(error)        
    }
}