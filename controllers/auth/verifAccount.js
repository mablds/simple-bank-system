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
        const accountToFilter = account.filter((e) => e.owner === req.body.owner)
        console.log(accountToFilter)
        if (accountToFilter.length > 0) {
            if (req.body.senha === accountToFilter[0].senha) {
                res.status(200).send({
                    id: accountToFilter[0]._id,
                    owner: accountToFilter[0].owner,
                    value: 'R$ ' + accountToFilter[0].value,
                    token: generateToken({ id: accountToFilter[0]._id })
                })
            } else {
                res.status(403).send('senha incorreta')
            }
        }
    } else {
        res.status(204).send('Body vazio')
    }
}