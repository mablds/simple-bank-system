const Account = require('../../models/account-model')

module.exports = async(req, res) => {
    function generateAccountNumber() {
        let num = ''
        while (num.length < 4) {
            num += Math.floor(Math.random() * 10)
        }
        return num
    }
    const numberCreated = generateAccountNumber();
    let userToCreate = {
        account: numberCreated,
        value: 0,
        owner: req.body.owner,
        password: req.body.password,
        email: req.body.email,
        admin: req.body.admin ? req.body.admin : false 
    }

    try {
        const creation = await Account.create(userToCreate)
        return res.send(creation)
    }  catch(err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}