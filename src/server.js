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
import productos from '../routers/api/productoApi'
import carrito from '../routers/api/carritoApi'
import chatRouter from '../routers/webSoket/chat/chat'
import ejsRouter from '../routers/ejs/ejs'
import formIoRouter from '../routers/webSoket/productos/form'

import productosDB from '../routers/apiDB/productoApiDB'
import chatDB from '../routers/apiDB/chatApiDB'
import carritoDB from '../routers/apiDB/carritoApiDB'

import home from '../routers/web/home';

import faker from '../routers/faker/faker'

// ---------------------  ENDPOINTS EXPRESS

// GET '/' -> ENDPOINT INICIAL
const PATH = '/';
const callback = (request, response, next) => {
	response.send({ mensaje: 'STORAGE PUEDE SER json, firebase, mongodb, mariadb, sqlite3, O VACIO TOMA POR DEFECTO MEMORIA! DIRIGETE A /api/productos-test FAKER O /apiDB/chat NORMALIZACION' });
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

app.use('/home', home)

app.use('/api/productos-test', faker )

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

