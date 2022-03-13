const express = require('express')
const { Router } = express

const router = new Router()

const faker = require('faker') 
faker.locale = 'es'

router.get('/', (req, res) => {
    const productos = [... new Array(5)].map((_, index)=>({ 
        id: index,
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: `${faker.image.imageUrl()}?${index}`
    }))
    res.json(productos)
})

module.exports = router