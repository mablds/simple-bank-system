const dbo = require('../../models/monguinho')

exports.get = (req, res, next) => {
    console.log('Get requested')
    dbo.readTable('bank', 'cliente')
        .then((user) => {
            console.log(user)
            res.send(user)
        })
}

exports.post = (req, res, next) => {
    console.log('Post requested')
    res.status(201).send(req.body)
    console.log(req.body + '\nPost aswered')
}
exports.put = (req, res, next) => {
    console.log('Put received')
    const id = req.params.id
    res.status(200).send({
        id: id,
        item: req.body
    })
    console.log({
        "id": id,
        "item": req.body
    })
    console.log('Put answered')
}
exports.delete = (req, res, next) => {
    console.log('Delete requested')
    res.status(200).send(req.body)
    console.log(req.body + '\nDelete executed')
}
