const express = require('express');
const isAdmin = require('../../middlewares/authAdmin');
const { Router } = express

const router = new Router()

const ContenedorDB = require('../../models/KnexClass');
const { options } = require('../../options/mariaDB');
const contenedor = new ContenedorDB(options, 'productos');

//---------ENDPOINTS---------
// GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
// GET '/api/productos' -> DEVUELVE TODOS LOS PRODUCTOS.
router.get('/', async (req, res) => {
	const productos = await contenedor.getAll();
	res.json(productos);
});
// GET '/api/productos/:id' -> DEVUELVE UN PRODUCTO SEGÚN SU ID.
router.get('/:id', async (req, res) => {
	const id = Number(req.params.id)
	const producto = await contenedor.getById(id);
	if (!producto) {
		res.send({
			error: 'producto no encontrado'
		});
	} else {
		res.json(producto);
	}
});

// POST: '/' - Para incorporar productos al listado (disponible para administradores)
// POST '/api/producto' -> RECIBE Y AGREGA UN PRODUCTO, Y LO DEVUELVE CON SU ID ASIGNADO.
router.post('/', isAdmin, async (req, res) => {
	try {
		const productoId = await contenedor.save(req.body)
		res.send({ productoId });
	} catch (err) {
		console.log({err})
	}

});

// PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
// PUT '/api/productos/:id' -> RECIBE Y ACTUALIZA UN PRODUCTO SEGÚN SU ID.
router.put('/:id', isAdmin, async (req, res) => {
	const productoUpadate = await contenedor.updateById(req.body, Number(req.params.id));
	if (!productoUpadate) {
		res.send({
			error: 'producto no encontrado'
		});
	} else {
		res.send({
			message: 'success',
			data: productoUpadate
		});
	}
});

// DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
// DELETE '/api/productos/:id' -> ELIMINA UN PRODUCTO SEGÚN SU ID.
router.delete('/:id', isAdmin, async (req, res) => {
	const productoDelete = await contenedor.deleteById(Number(req.params.id))
	if (!productoDelete) {
		res.send({
			error: 'producto no encontrado'
		});
	} else {
		res.send({
			message: 'Producto eliminado'
		});
	}
});


// GET '/api/productosRandom' -> DEVUELVE UN PRODUCTO AL AZAR
router.get('/productosRandom', async (req, res) => {
	const producto = await contenedor.getRandom();
	res.json(producto);
});

// GET '/api/consulta?1clave=valor&2clave=valor' -> DEVUELVE LA CONSULTA.
router.get('/consulta', (req, res) => {
	console.log(req.query)
	res.send(req.query)
});

module.exports = router;