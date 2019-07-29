const Account = require('../../models/account-model')

module.exports.create = async(req, res) => {
    function generateAccount() {
        let num = ''
        while (num.length < 4) {
            num += Math.floor(Math.random() * 10)
        }
        return num
    }
    let userToCreate = {
        conta: generateAccount(),
        saldo: 0,
        titular: req.body.titular,
        senha: req.body.senha
    }
    await Account.create(userToCreate)
    res.send('Usuário cadastrado com sucesso! \nUsuário: ' + req.body.titular + '\nNúmero da conta: ' + userToCreate.conta)
}