const express = require('express')
const { Router } = express

const router = new Router()


router.get('/', (req, res) => {
	res.render("./pages/formularioIo", {
	});

	const { app } = req

	const Producto = require('../../../models/ProductoClass')
	const contenedor = new Producto('./db/productos.json')

	const Chat = require('../../../models/ApiChat')
	const chat = new Chat('./db/chat.json')

	let io = app.get('io');

	io.on('connection', async (socket) => {
		// // "CONNECTION" SE EJECUTA LA PRIMERA VEZ PARA CARGAR LOS PRODUCTOS
		const productos = await contenedor.getAll();
		io.sockets.emit('products', productos);

		const mensajes = await chat.getAll();
		io.sockets.emit('chat historial', mensajes);

		// "CONNECTION" SE EJECUTA LA PRIMERA VEZ QUE SE ABRE UNA NUEVA CONEXIÓN
		console.log(`Usuario conectado ${socket.id}`)

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
});

module.exports = router;