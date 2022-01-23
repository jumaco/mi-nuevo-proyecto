const express = require('express')
const { Router } = express

import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

import config from '../../src/config.js'

const router = new Router()


//------------------------  RUTA session


router.use(cookieParser())
router.use(session({
    // Persistencia por redis database
    store: MongoStore.create({
        mongoUrl: config.mongoRemote.host,
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false/*,
    rolling: true,
    cookie: {
        maxAge: 60000
    }*/
}))

router.use('/home', (req, res) => {
    if (req.session.contador) {
        req.session.contador++
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces`)
    } else {
        req.session.contador = 1
        res.send(`Bienvenido!`)
    }
})

router.use('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.send('Logout OK!')
        else res.send({ status: 'Logout EROOR', body: err })
    })
})

export default router