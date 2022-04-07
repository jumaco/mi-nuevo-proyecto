const express = require('express')
const { Router } = express


const {checkAuthentication} = require('../../middlewares/passportMiddle')

const router = new Router()

router.use('/', checkAuthentication, (req, res) => {
    res.render('./pages/home', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
        
    })
    console.log(req.user)
})

module.exports = router