const express = require('express')
const { Router } = express

const router = new Router()


// INDICAMOS QUE QUEREMOS CARGAR LOS ARCHIVOS ESTÁTICOS QUE SE ENCUENTRAN EN DICHA CARPETA
router.use('/', express.static('./public/io'))


module.exports = router;