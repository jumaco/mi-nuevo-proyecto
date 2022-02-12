const config = require('../config.js')

console.log('STORAGE INDEX DAO', process.env.STORAGE)

import ProductosDaoArchivo from './productos/ProductosDaoArchivo.js'
import CarritosDaoArchivo from './carritos/CarritosDaoArchivo.js'
import ProductosDaoFirebase from './productos/ProductosDaoFirebase.js'
import CarritosDaoFirebase from './carritos/CarritosDaoFirebase.js'
import ProductosDaoMongoDB from './productos/ProductosDaoMongoDB.js'
import CarritosDaoMongoDB from './carritos/CarritosDaoMongoDB.js'
import ProductosDaoMemoria from './productos/ProductosDaoMemoria.js'
import CarritosDaoMemoria from './carritos/CarritosDaoMemoria.js'

import ChatDaoArchivo from './chat/ChatDaoArchivo.js'
import ChatDaoFirebase from './chat/ChatDaoFirebase.js'
import ChatDaoMongoDB from './chat/ChatDaoMongoDB.js'
import ChatDaoMemoria from './chat/ChatDaoMemoria.js'

let productosDao

if (config.STORAGE === 'mongodb') {
	productosDao = new ProductosDaoMongoDB()
}

if (config.STORAGE === 'mongoRemote') {
	productosDao = new ProductosDaoMongoDB()
}

if (config.STORAGE === 'memoria') {
	productosDao = new ProductosDaoMemoria()
}

if (config.STORAGE === 'firebase') {
	productosDao = new ProductosDaoFirebase()
}

if (config.STORAGE === 'file') {
	productosDao = new ProductosDaoArchivo()
}


let carritosDao

if (config.STORAGE === 'mongodb') {
	carritosDao = new CarritosDaoMongoDB()
}

if (config.STORAGE === 'mongoRemote') {
	carritosDao = new CarritosDaoMongoDB()
}

if (config.STORAGE === 'memoria') {
	carritosDao = new CarritosDaoMemoria()
}

if (config.STORAGE === 'firebase') {
	carritosDao = new CarritosDaoFirebase()
}

if (config.STORAGE === 'file') {
	carritosDao = new CarritosDaoArchivo()
}


let chatDao

if (config.STORAGE === 'mongodb') {
	chatDao = new ChatDaoMongoDB()
}

if (config.STORAGE === 'mongoRemote') {
	chatDao = new ChatDaoMongoDB()
}

if (config.STORAGE === 'memoria') {
	chatDao = new ChatDaoMemoria()
}

if (config.STORAGE === 'firebase') {
	chatDao = new ChatDaoFirebase()
}

if (config.STORAGE === 'file') {
	chatDao = new ChatDaoArchivo()
}

console.log({ productosDao }, { carritosDao }, { chatDao })

export { productosDao, carritosDao, chatDao }