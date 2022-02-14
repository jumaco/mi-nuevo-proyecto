const config = require('../config.js')

const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo.js') 
const CarritosDaoArchivo = require('./carritos/CarritosDaoArchivo.js') 
const ProductosDaoFirebase = require('./productos/ProductosDaoFirebase.js') 
const CarritosDaoFirebase = require('./carritos/CarritosDaoFirebase.js') 
const ProductosDaoMongoDB = require('./productos/ProductosDaoMongoDB.js') 
const CarritosDaoMongoDB = require('./carritos/CarritosDaoMongoDB.js') 
const ProductosDaoMemoria = require('./productos/ProductosDaoMemoria.js') 
const CarritosDaoMemoria = require('./carritos/CarritosDaoMemoria.js') 

const ChatDaoArchivo = require('./chat/ChatDaoArchivo.js') 
const ChatDaoFirebase = require('./chat/ChatDaoFirebase.js') 
const ChatDaoMongoDB = require('./chat/ChatDaoMongoDB.js') 
const ChatDaoMemoria = require('./chat/ChatDaoMemoria.js') 

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

module.exports = { productosDao, carritosDao, chatDao }