const express = require('express')
const { Router } = express

const router = new Router()

// const Contenedor = require('../../models/ProductoClass')
// const contenedor = new Contenedor('./db/productos.json')

const { productosDao: productosApi } = require('../../daos/index.js')

// ENDPOINTS EJS

// GET UN FORMULARIO DE CARGA DE PRODUCTOS EN LA RUTA ‘/form’
router.get('/new', (req, res) => {
	res.render("./pages/formularioPost", {
		isAuthenticated: req.isAuthenticated()
	});
});

// POST
// (configurar la ruta '/productos' PARA RECIBIR EL POST DE ESE FORMULARIO, Y REDIRIGIR AL LISTADO DE /list-productos).
router.post('/new', async (req, res) => {
	await productosApi.save(req.body)
	res.redirect('/productos');
});

// GET
// UNA VISTA DE LOS PRODUCTOS CARGADOS (UTILIZANDO PLANTILLAS DE EJS) EN LA RUTA GET '/list-productos'.
router.get('/', async (req, res) => {
	const productos = await productosApi.getAll();
	res.render("./pages/listadoDeProductos", {
		isAuthenticated: req.isAuthenticated(),
		productos: productos,
		hayProductos: productos.length
	});
});
// AMBAS PÁGINAS CONTARÁN CON UN BOTÓN QUE REDIRIJA A LA OTRA.

router.get('/:id', async (req, res) => {
	const producto = await productosApi.getById(req.params.id);

	if (!producto) {
		res.render('./pages/error', {
			isAuthenticated: req.isAuthenticated()
		})
	} else {
		res.render("./pages/product", {
			isAuthenticated: req.isAuthenticated(),
			producto: producto
		});
	}

	
});

module.exports = router;