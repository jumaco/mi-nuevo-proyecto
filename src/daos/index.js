require('dotenv').config()

console.log('CASE', process.env.STORAGE)

import ProductosDaoArchivo from './productos/ProductosDaoArchivo.js'
import CarritosDaoArchivo from './carritos/CarritosDaoArchivo.js'
import ProductosDaoFirebase from './productos/ProductosDaoFirebase.js'
import CarritosDaoFirebase from './carritos/CarritosDaoFirebase.js'
import ProductosDaoMongoDB from './productos/ProductosDaoMongoDB.js'
import CarritosDaoMongoDB from './carritos/CarritosDaoMongoDB.js'
import ProductosDaoMemoria from './productos/ProductosDaoMemoria.js'
import CarritosDaoMemoria from './carritos/CarritosDaoMemoria.js'

let productosDao

if (process.env.storage === 'mongodb') {
	productosDao = new ProductosDaoMongoDB()
}

if (process.env.storage === 'memoria') {
	productosDao = new ProductosDaoMemoria()
}

if (process.env.storage === 'firebase') {
	productosDao = new ProductosDaoFirebase()
}

if (process.env.storage === 'json') {
	productosDao = new ProductosDaoArchivo()
}


let carritosDao

if (process.env.storage === 'mongodb') {
	carritosDao = new CarritosDaoMongoDB()
}

if (process.env.storage === 'memoria') {
	carritosDao = new CarritosDaoMemoria()
}

if (process.env.storage === 'firebase') {
	carritosDao = new CarritosDaoFirebase()
}

if (process.env.storage === 'json') {
	carritosDao = new CarritosDaoArchivo()
}

console.log({ productosDao }, {carritosDao})

export { productosDao, carritosDao }