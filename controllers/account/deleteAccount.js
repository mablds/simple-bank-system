const Account = require('../../models/account-model')

module.exports = async(req, res) => {
  if (!req.body.account) return res.status(400).json({msg: 'Body inválido. Informações insuficientes'})
  try {
    await Account.findOneAndDelete({ account: req.body.account })
    return res.status(200).json({msg: 'conta excluída!'})
  } catch (err) {
    return res.status(500).json({msg: 'err'})
  }
}