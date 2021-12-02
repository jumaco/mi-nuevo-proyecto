// const express = require('express');

import express from 'express'

const app = express();
const PORT = 8080;

// const { Server: HttpServer } = require('http')
// const { Server: IOServer } = require('socket.io')
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//GUARDO CÓMO ATRIBUTO LA INSTANCIA DEL SOCKET PARA PODER USARLA EN ROUTERS
app.set('io',io)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//----------------------  MÓDULOS DE DIRECCIONAMIENTO ROUTER

// const productos = require('../routers/api/productoApi');
// const carrito = require('../routers/api/carritoApi');
// const chatRouter = require('../routers/webSoket/chat/chat');
// const ejsRouter = require('../routers/ejs/ejs');
// const formIoRouter = require('../routers/webSoket/productos/form')
import productos from '../routers/api/productoApi'
import carrito from '../routers/api/carritoApi'
import chatRouter from '../routers/webSoket/chat/chat'
import ejsRouter from '../routers/ejs/ejs'
import formIoRouter from '../routers/webSoket/productos/form'

// const productosDB = require('../routers/apiDB/productoApiDB');
// const chatDB = require('../routers/apiDB/chatApiDB');
// const carritoDB = require('../routers/apiDB/carritoApiDB');
import productosDB from '../routers/apiDB/productoApiDB'
import chatDB from '../routers/apiDB/chatApiDB'
import carritoDB from '../routers/apiDB/carritoApiDB'



// ---------------------  ENDPOINTS EXPRESS

// GET '/' -> ENDPOINT INICIAL
const PATH = '/';
const callback = (request, response, next) => {
	response.send({ mensaje: 'STORAGE PUEDE SER json, firebase, mongodb, mariadb, sqlite3, O VACIO TOMA POR DEFECTO MEMORIA! DIRIGETE A /api/productos O /api/carrito' });
};
app.get(PATH, callback);

//------------------------  STATIC
app.use('/agregar', express.static('public'));
// INDICAMOS QUE QUEREMOS CARGAR LOS ARCHIVOS ESTÁTICOS QUE SE ENCUENTRAN EN DICHA CARPETA(para EJS)
app.use(express.static('./public/io'))

//------------------------  ROUTERS

app.use('/api/productos', productos)
app.use('/api/carrito', carrito)
app.use('/chat', chatRouter)
app.use('/ejs', ejsRouter)
app.use('/form-io', formIoRouter)

app.use('/apiDB/productos', productosDB)
app.use('/apiDB/chat', chatDB)
app.use('/apiDB/carrito', carritoDB)

//------------------------  RUTA METODO NO IMPLEMENTADO

app.use((req, res, next) => {
	res.status(404).send({
		error: -2,
		descripcion: `ruta '${req.path}', método '${req.method}' no implementada.`
	});
});
//------------------------  EJS

app.set('views', './views');
app.set('view engine', 'ejs');

//------------------------  ENCIENDO EL SERVER
const callbackInit = () => {
	console.log(`Servidor corriendo en: http://localhost:${PORT}`);
};

httpServer.listen(process.env.PORT || PORT, callbackInit);

//------------------------  MANEJO DE ERRORES
httpServer.on("error", error => console.log(`Error en servidor ${error}`))

