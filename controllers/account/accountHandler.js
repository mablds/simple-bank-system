const express = require('express'),
    router = express.Router()


//consultar no banco
router.get('/:id')
    //criar no banco
router.post('/')
    //transferência
router.patch('/:idSender/:idReceiver')
    //saque, deposito
router.post('/:id')



exports.router = router