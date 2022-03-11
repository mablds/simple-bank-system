const Account = require('../../models/account-model')

module.exports.getAll = async(req, res) => {
  const accounts = await Account.find()
  return res.send(accounts)
}