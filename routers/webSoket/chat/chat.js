const express = require('express')
const { Router } = express

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const router = new Router()


const httpServer = new HttpServer(server)
const io = new IOServer(httpServer)






router.get('/', (req, res) => {
   res.send('get ok')
})

router.post('/', (req, res) => {
   res.send('post ok')
})



module.exports = router;