const express = require('express')
const { Router } = express

const router = new Router()

const Contenedor = require('../../models/ProductoClass')
const contenedor = new Contenedor('./db/productos.json')

// ENDPOINTS EJS

// GET UN FORMULARIO DE CARGA DE PRODUCTOS EN LA RUTA ‘/form’
router.get('/', (req, res) => {
	res.render("./pages/formularioPost");
});

// POST
// (configurar la ruta '/productos' PARA RECIBIR EL POST DE ESE FORMULARIO, Y REDIRIGIR AL LISTADO DE /list-productos).
router.post('/productos', async (req, res) => {
	await contenedor.save(req.body)
	res.redirect('/ejs/list-productos');
});

// GET
// UNA VISTA DE LOS PRODUCTOS CARGADOS (UTILIZANDO PLANTILLAS DE EJS) EN LA RUTA GET '/list-productos'.
router.get('/list-productos', async (req, res) => {
	const productos = await contenedor.getAll();
	res.render("./pages/listadoDeProductos", {
		productos: productos,
		hayProductos: productos.length
	});
});
// AMBAS PÁGINAS CONTARÁN CON UN BOTÓN QUE REDIRIJA A LA OTRA.


export default router;