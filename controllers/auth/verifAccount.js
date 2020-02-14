const Account = require('../../models/account-model')
const jwt = require('jsonwebtoken')
const hash = process.env.SECRET_HASH

module.exports.findByAccount = async(req, res) => {
    function generateToken(params = {}) {
        return jwt.sign(params, hash, {
            expiresIn: 3600 //1h
        })
    }
    if (req.body) {
        const account = await Account.find()
        const accountToFilter = account.filter((e) => e.account === req.body.account)
        if (accountToFilter.length > 0) {
            if (req.body.password === accountToFilter[0].password) {
                res.status(200).json({
                    id: accountToFilter[0]._id,
                    owner: accountToFilter[0].owner,
                    value: 'R$ ' + accountToFilter[0].value,
                    admin: accountToFilter[0].admin,
                    token: generateToken({ id: accountToFilter[0]._id, admin: accountToFilter[0].admin })
                })
            } else {
                res.status(403).json({ msg: 'senha incorreta' })
            }
        }
    } else {
        res.status(204).json({ msg: 'Body vazio' })
    }
}