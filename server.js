const express = require('express');

const app = express();
const PORT = 8080;

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//guardo como atributo la instancia del socket para poder usarla en las rutas
app.set('io',io)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//----------------------  MÓDULOS DE DIRECCIONAMIENTO ROUTER

const productos = require('./routers/api/productoApi');
const carrito = require('./routers/api/carritoApi');
const chatRouter = require('./routers/webSoket/chat/chat');
const ejsRouter = require('./routers/ejs/ejs');
const formIoRouter = require('./routers/webSoket/productos/form')

const productosDB = require('./routers/apiDB/productoApiDB');
const chatDB = require('./routers/apiDB/chatDB');
const carritoDB = require('./routers/apiDB/carritoApiDB');

// ---------------------  ENDPOINTS EXPRESS

// GET '/' -> ENDPOINT INICIAL
const PATH = '/';
const callback = (request, response, next) => {
	response.send({ mensaje: 'HOLA MUNDO! DIRIGETE A /api/productos O /api/carrito' });
};
app.get(PATH, callback);

//------------------------  STATIC
app.use('/agregar', express.static('public'));
// INDICAMOS QUE QUEREMOS CARGAR LOS ARCHIVOS ESTÁTICOS QUE SE ENCUENTRAN EN DICHA CARPETA(para EJS)
app.use(express.static('./public/io'))

//-----ROUTERS-----

app.use('/api/productos', productos)
app.use('/api/carrito', carrito)
app.use('/chat', chatRouter)
app.use('/ejs', ejsRouter)
app.use('/form-io', formIoRouter)

app.use('/apiDB/productos', productosDB)
app.use('/apiDB/carrito', chatDB)
app.use('/apiDB/chat', carritoDB)

//-----FIN ROUTERS-----

app.use((req, res, next) => {
	res.status(404).send({
		error: -2,
		descripcion: `ruta '${req.path}', método '${req.method}' no implementada.`
	});
});
//------------------------  EJS


app.set('views', './views');
app.set('view engine', 'ejs');


//-----------WEBSOCKET----------

// const Contenedor = require('./models/ProductoClass')
// const contenedor = new Contenedor('./db/productos.json')

// const Chat = require('./models/ApiChat')
// const chat = new Chat('./db/chat.json')

// io.on('connection', async (socket) => {
// 	// "CONNECTION" SE EJECUTA LA PRIMERA VEZ PARA CARGAR LOS PRODUCTOS
// 	const productos = await contenedor.getAll();
// 	io.sockets.emit('products', productos);

// 	const mensajes = await chat.getAll();
// 	io.sockets.emit('chat historial', mensajes);

// 	// "CONNECTION" SE EJECUTA LA PRIMERA VEZ QUE SE ABRE UNA NUEVA CONEXIÓN
// 	console.log(`Usuario conectado ${socket.id}`)

// 	// SE IMPRIMIRÁ SOLO LA PRIMERA VEZ QUE SE HA ABIERTO LA CONEXIÓN
// 	socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor')

// 	// ESCUCHA EL SERVIDOR AL CLIENTE
// 	socket.on('notificacion', data => {
// 		console.log(data)
// 	})

// 	/*ESCUCHO LOS MENSAJES ENVIADOS POR EL CLIENTE Y SE LOS PROPAGO A TODOS*/
// 	socket.on('mensaje', data => {
// 		mensajes.push({ socketid: socket.id, mensaje: data })
// 		io.sockets.emit('mensajes', mensajes);
// 	})

// 	// SE IMPRIMIRÁ SOLO CUANDO SE CIERRE LA CONEXIÓN
// 	socket.on('disconnect', () => {
// 		console.log(`Usuario desconectado ${socket.id}`);
// 	});

// 	/*ESCUCHO LOS MENSAJES CHAT ENVIADOS, LOS GUARDO EN CHAT.JSON*/
// 	socket.on('chat message', async (msg) => {
// 		let userId = socket.id
// 		console.log(`chat: ${msg.usuario} dice: ${msg.mensaje}`);
// 		await chat.save({
// 			...msg,
// 			userId
// 		})
// 	});

// 	//DIFUSIÓN
// 	socket.on('chat message', (msg) => {
// 		io.emit('chat message', msg);
// 	});

// 	//CARGA DE PRUDUCTO MEDIANTE SOCKET.IO
// 	socket.on('new-product', async product => {

// 		await contenedor.save(product);
// 		const productos = await contenedor.getAll();
// 		console.log(productos)
// 		io.sockets.emit('products', productos);
// 	})
// })


// ENCIENDO EL SERVER
const callbackInit = () => {
	console.log(`Servidor corriendo en: http://localhost:${PORT}`);
};
httpServer.listen(process.env.PORT || PORT, callbackInit);

// MANEJO DE ERRORES
httpServer.on("error", error => console.log(`Error en servidor ${error}`))

