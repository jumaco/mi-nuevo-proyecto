import { Router } from 'express'
import { webAuth } from '../../src/auth/index.js'

import path from 'path'

const home = new Router()

home.get('/', (req, res) => {
    res.redirect('/home')
})

home.get('/home', webAuth, (req, res) => {
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), {
        nombre: req.user.displayName,
        foto: req.user.photos[0].value,
        email: req.user.emails[0].value,
        contador: req.user.contador
    })
})

home.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/productos-vista-test.html'))
})

export default home