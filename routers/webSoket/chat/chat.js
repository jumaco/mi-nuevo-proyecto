const express = require('express')
const { Router } = express

const router = new Router()


// INDICAMOS QUE QUEREMOS CARGAR LOS ARCHIVOS ESTÁTICOS QUE SE ENCUENTRAN EN DICHA CARPETA
// router.use('/', express.static('./public/io'))

router.get('/chat', (req, res) => {
	res.sendFile('./public/chat.html', { root: __dirname })

const Contenedor = require('../../../models/ProductoClass')
const contenedor = new Contenedor('./db/productos.json')

const Chat = require('../../../models/ApiChat')
const chat = new Chat('./db/chat.json')

let io = app.get('io');

io.on('connection', async (socket) => {
	// "CONNECTION" SE EJECUTA LA PRIMERA VEZ PARA CARGAR LOS PRODUCTOS
	const productos = await contenedor.getAll();
	io.sockets.emit('products', productos);

	const mensajes = await chat.getAll();
	io.sockets.emit('chat historial', mensajes);

	// "CONNECTION" SE EJECUTA LA PRIMERA VEZ QUE SE ABRE UNA NUEVA CONEXIÓN
	console.log(`Usuario conectado ${socket.id}`)

	// SE IMPRIMIRÁ SOLO LA PRIMERA VEZ QUE SE HA ABIERTO LA CONEXIÓN
	socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor')

	// ESCUCHA EL SERVIDOR AL CLIENTE
	socket.on('notificacion', data => {
		console.log(data)
	})

	/*ESCUCHO LOS MENSAJES ENVIADOS POR EL CLIENTE Y SE LOS PROPAGO A TODOS*/
	socket.on('mensaje', data => {
		mensajes.push({ socketid: socket.id, mensaje: data })
		io.sockets.emit('mensajes', mensajes);
	})

	// SE IMPRIMIRÁ SOLO CUANDO SE CIERRE LA CONEXIÓN
	socket.on('disconnect', () => {
		console.log(`Usuario desconectado ${socket.id}`);
	});

	/*ESCUCHO LOS MENSAJES CHAT ENVIADOS, LOS GUARDO EN CHAT.JSON*/
	socket.on('chat message', async (msg) => {
		let userId = socket.id
		console.log(`chat: ${msg.usuario} dice: ${msg.mensaje}`);
		await chat.save({
			...msg,
			userId
		})
	});

	//DIFUSIÓN
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	});

	//CARGA DE PRUDUCTO MEDIANTE SOCKET.IO
	socket.on('new-product', async product => {

		await contenedor.save(product);
		const productos = await contenedor.getAll();
		console.log(productos)
		io.sockets.emit('products', productos);
	})
})


})





module.exports = router;