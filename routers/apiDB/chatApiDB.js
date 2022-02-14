const express = require('express');
const isAdmin = require('../../middlewares/authAdmin');
const { Router } = express

const router = new Router()

// const ContenedorDB = require('../../models/KnexClass');
// const { options } = require('../../options/mariaDB');
// const contenedor = new ContenedorDB(options, 'productos');

// const ProductoDB = require('../../models/KnexClass');
// const { options } = require('../../options/mariaDB');
// const contenedor = new ProductoDB(options, 'productos')

const { productosDao : productosApi } = require('../../src/daos/index.js') 

// ---------Knex SQLite--------------------------------
// const ChatDB = require('../../models/ChatKnexClass')
// const { optionsLite } = require('../../options/SQLite');
// const chat = new ChatDB(optionsLite, 'chat')

//--------------Persistencia CHAT DAO -----------------

const { chatDao : chatApi } = require('../../src/daos/index.js') 


//-------------------- NORMALIZACIÓN DE MENSAJES --------------------

const { normalize, schema, } = require('normalizr') 

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity('message', { author: schemaAuthor }, { idAttribute: 'id' })

// Definimos un esquema de mensajes
const schemaMensajes = new schema.Entity('messages', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, schemaMensajes)


//------------------------------ENDPOINTS----------------------------------

router.get('/', (req, res) => {
	console.log("WebSocket desde DB");
	res.render("./pages/formularioIo", {
	});

	async function mensajesNormalizados() {
		const mensajes = await chatApi.getAll()
		const normalizados = normalizarMensajes({ id: 'mensajes', mensajes })
		return normalizados
	}

	const { app } = req
	let io = app.get('io');

	io.on('connection', async (socket) => {
		// // "CONNECTION" SE EJECUTA LA PRIMERA VEZ PARA CARGAR LOS PRODUCTOS
		const productos = await productosApi.getAll();
		io.sockets.emit('products', productos);

		const mensajes = await mensajesNormalizados();
		io.sockets.emit('chat historial', mensajes);

		// "CONNECTION" SE EJECUTA LA PRIMERA VEZ QUE SE ABRE UNA NUEVA CONEXIÓN
		console.log(`Usuario conectado ${socket.id}`)

		// ESCUCHA EL SERVIDOR AL CLIENTE
		socket.on('notificacion', data => {
			console.log('hola',data)
		})

		// /*ESCUCHO LOS MENSAJES ENVIADOS POR EL CLIENTE Y SE LOS PROPAGO A TODOS*/
		// socket.on('mensaje', data => {
		// 	mensajes.push({ socketid: socket.id, mensaje: data })
		// 	io.sockets.emit('mensajes', mensajes);
		// })

		/*ESCUCHO LOS MENSAJES CHAT ENVIADOS, LOS GUARDO EN DB*/
		socket.on('chat message', async (message) => {
			message.timestamp = new Date().toLocaleString()
			// console.log(message)
			await chatApi.save(message)
			let mensajes = await mensajesNormalizados();
			io.sockets.emit('chat historial', mensajes);

		});


		// SE IMPRIMIRÁ SOLO CUANDO SE CIERRE LA CONEXIÓN
		socket.on('disconnect', () => {
			console.log(`Usuario desconectado ${socket.id}`);
		});


		//CARGA DE PRUDUCTO MEDIANTE SOCKET.IO
		socket.on('new-product', async product => {
			await productosApi.save(product);
			const productos = await productosApi.getAll();
			console.log(productos)
			io.sockets.emit('products', productos);
		})
	})
});

module.exports = router;