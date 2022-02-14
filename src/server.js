const config = require('./config.js')
const express = require( 'express')

const app = express()

const { Server : HttpServer } = require('http')
const { Server : IOServer } = require('socket.io') 

const cluster = require('cluster') /* https://nodejs.org/dist/latest-v14.x/docs/api/cluster.html */

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// GUARDO CÓMO ATRIBUTO LA INSTANCIA DEL SOCKET PARA PODER USARLA EN ROUTERS
app.set('io', io)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// ---------------------- YARGS ----------------------

const args = require('yargs/yargs')(process.argv.slice(2));
// GUARDO CÓMO ATRIBUTO LA INSTANCIA DEL ARGS PARA PODER USARLA EN ROUTERS
app.set('args', args)

args
	.default({
		env: config.NODE_ENV, port: config.PORT, debug: false, mode: config.MODE, storage: config.STORAGE
	})
	.alias({
		e: 'env', p: 'port', d: 'debug', m: 'mode', s: 'storage', _: 'otros'
	})
	.argv;

// ----------------------  MÓDULOS DE DIRECCIONAMIENTO ROUTER  ----------------------

const productos = require('../routers/api/productoApi') 
const carrito = require('../routers/api/carritoApi') 
const chatRouter = require('../routers/webSoket/chat/chat') 
const ejsRouter = require('../routers/ejs/ejs') 
const formIoRouter = require('../routers/webSoket/productos/form') 

const productosDB = require('../routers/apiDB/productoApiDB') 
const chatDB = require('../routers/apiDB/chatApiDB') 
const carritoDB = require('../routers/apiDB/carritoApiDB') 

const home = require('../routers/web/home') 
const faker = require('../routers/faker/faker') 

const passport = require('../routers/passport/passport') 

const info = require('../routers/info/info') 
const randoms = require('../routers/random/random') 

// ----------------------  ENDPOINTS EXPRESS  ----------------------

// GET '/' -> ENDPOINT INICIAL
const PATH = '/'
const callback = (request, response, next) => {
	response.send({ mensaje: 'Bienvenido! DIRIGETE A /api/productos-test FAKER O /apiDB/chat NORMALIZACION' })
};
app.get(PATH, callback)

// ----------------------  STATIC  ----------------------

app.use('/agregar', express.static('public'))

// INDICAMOS QUE QUEREMOS CARGAR LOS ARCHIVOS ESTÁTICOS QUE SE ENCUENTRAN EN DICHA CARPETA(para EJS)
app.use(express.static('./public/io'))

// ----------------------  ROUTERS  ----------------------

app.use('/api/productos', productos)
app.use('/api/carrito', carrito)
app.use('/chat', chatRouter)
app.use('/ejs', ejsRouter)
app.use('/form-io', formIoRouter)

app.use('/apiDB/productos', productosDB)
app.use('/apiDB/chat', chatDB)
app.use('/apiDB/carrito', carritoDB)

app.use('/home', home)
app.use('/api/productos-test', faker)

app.use('/passport', passport)

app.use('/info', info)
app.use('/api/randoms', randoms)

// ----------------------  RUTA METODO NO IMPLEMENTADO  ----------------------

app.use((req, res, next) => {
	res.status(404).send({
		error: -2,
		descripcion: `ruta '${req.path}', método '${req.method}' no implementada.`
	});
});

// ----------------------  EJS  ----------------------

app.set('views', './views')
app.set('view engine', 'ejs')

// ----------------------  ENCIENDO EL SERVER  ----------------------
const callbackInit = () => {
	console.log(`Servidor corriendo en: http://${config.HOST}:${args.argv.port}, ENTORNO: ${args.argv.env}, STORAGE: ${args.argv.storage}, PID WORKER ${process.pid}, MODO: ${args.argv.mode}`)
};

const numCPUs = require('os').cpus().length
const isCluster = args.argv.mode === 'CLUSTER'
/* MASTER */
if (cluster.isMaster && isCluster) {
		console.log(`Cantidad de procesadores: ${numCPUs}`)

	console.log(`Servidor corriendo en: http://${config.HOST}:${args.argv.port}, ENTORNO: ${args.argv.env}, STORAGE: ${args.argv.storage}, PID MASTER ${process.pid}, MODO: ${args.argv.mode}`)

	// console.log(`PID MASTER ${process.pid}`)

	for (let i = 0; i < numCPUs; i++) {
		cluster.fork()
	}

	cluster.on('exit', worker => {
		console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
		cluster.fork()
	})
}
/* WORKERS */
else {
	httpServer.listen(args.argv.port, callbackInit)
	// ----------------------  MANEJO DE ERRORES  ----------------------
	httpServer.on("error", error => console.log(`Error en servidor ${error}`))
}