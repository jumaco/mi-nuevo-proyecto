const express = require('express')
const { Router } = express

const app = express()
const router = new Router()

router.get('/', (req, res) => {
	res.send('get ok')
})

router.post('/', (req, res) => {
	res.send('post ok')
})

app.use('/', router)

app.listen(8080)



module.exports = router;