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
    //if(!req.body.account) res.status(204).json({ msg: 'Favor informar uma conta válida' })
    if(!req.body.email) res.status(204).json({ msg: 'Favor informar uma email válido' })
    Account.find({ email: `${req.body.email}`}).then((account) => {
      console.log(account)
      if (req.body.password === account[0]?.password) {
        return res.status(200).json({
          id: account[0]._id,
          account: account[0].account,
          owner: account[0].owner,
          value: 'R$ ' + account[0].value,
          admin: account[0].admin,
          token: generateToken({ id: account[0]._id, admin: account[0].admin })
        })
      } else {
        return res.status(403).json({ msg: 'senha incorreta' })
      }
    })
  } else {
    return res.status(204).json({ msg: 'Body inválido' })
  }
}
