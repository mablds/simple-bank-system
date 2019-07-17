const Account = require('../../models/account-model')
const jwt = require('jsonwebtoken')
const hash = process.env.SECRET_HASH

module.exports.findByAccount = async(req, res) => {
    console.log(req.body)

    function generateToken(params = {}) {
        return jwt.sign(params, hash, {
            expiresIn: 3600 //1h
        })
    }
    if (req.body) {
        const account = await Account.find()
        const accountToFilter = account.filter((e) => e.titular === req.body.titular)
        console.log(accountToFilter)
        if (accountToFilter.length > 0) {
            if (req.body.senha === accountToFilter[0].senha) {

                res.send({
                    id: accountToFilter[0]._id,
                    titular: accountToFilter[0].titular,
                    saldo: 'R$ ' + accountToFilter[0].saldo,
                    token: generateToken({ id: accountToFilter[0]._id })
                })
            } else {
                res.send('senha incorreta')
            }
        }
    } else {
        res.send('Body vazio')
    }
}