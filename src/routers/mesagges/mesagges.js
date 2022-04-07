const express = require('express')
const { Router } = express

const mailer = require('../../notification/nodeMailer')
const mensagge = require('../../notification/twilio')

const router = new Router()

router.get('/mailer', (req, res) => {
    try {
        mailer('"BackEnd 👻" <backend@proyecto.com>',
            "Prueba ✔",
            "Hello world?",
            "<b>Hello world?</b>"
        ).catch(console.error);
        res.sendStatus(200);
    } catch (err) { console.log(err) }
})

router.get('/mesagge', (req, res) => {
    try {
        res.sendStatus(200);
        mensagge(
            'Hola soy un mensaje desde Node.js!',
            ['https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg']
        )
    } catch (err) { console.log(err) }
})

module.exports = router