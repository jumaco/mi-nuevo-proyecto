const express = require('express')
const { Router } = express


const { checkAuthentication } = require('../../middlewares/passportMiddle')

const { productosDao: productosApi } = require('../../daos/index.js')
const { carritosDao: carritosApi } = require('../../daos/index.js')

const router = new Router()



router.get('/', checkAuthentication, async (req, res) => {
    try {
        if (await carritosApi.getByUid(req.user.id)) {

            const carrito = await carritosApi.getByUid(req.user.id)

            res.render('./pages/cart', {
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
                ...carrito
            })
            console.log(req.user.id)
            console.log(`Carrito existente`, carrito)

        } else {
            const carrito = await carritosApi.save({}, '', req.user.id)
            res.render('./pages/cart', {
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
                carrito: carrito
            })
            console.log(req.user.id)
            console.log(`Nuevo carrito`, carrito)
        }
    } catch (err) {
        console.log(err)
    }

})

router.post('/', checkAuthentication, async (req, res) => {

    const idCarrito = await carritosApi.save(req.body, req.user.Id, req.params.uId)
})

module.exports = router