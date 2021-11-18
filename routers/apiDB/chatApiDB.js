const express = require('express');
const isAdmin = require('../../middlewares/authAdmin');
const { Router } = express

const router = new Router()

// const ContenedorDB = require('../../models/KnexClass');
// const { options } = require('../../options/mariaDB');
// const contenedor = new ContenedorDB(options, 'productos');
const ProductoDB = require('../../models/KnexClass');
const { options } = require('../../options/mariaDB');
const contenedor = new ProductoDB(options, 'productos')

const ChatDB = require('../../models/ChatKnexClass')
const { optionsLite } = require('../../options/SQLite');
const chat = new ChatDB(optionsLite, 'chat')
//---------ENDPOINTS---------

router.get('/', (req, res) => {
	console.log("WebSocket desde DB");
	res.render("./pages/formularioIo", {
	});

	const { app } = req
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

		/*ESCUCHO LOS MENSAJES CHAT ENVIADOS, LOS GUARDO EN DB*/
		socket.on('chat message', async (msg) => {
			let userId = socket.id
			console.log(`chat: ${msg.usuario} dice: ${msg.mensaje}`);
			console.log({
				...msg,
				userId
			})
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