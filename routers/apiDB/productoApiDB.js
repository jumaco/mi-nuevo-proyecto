const express = require('express');
const isAdmin = require('../../middlewares/authAdmin');
const { Router } = express

const router = new Router()

const ContenedorDB = require('../../models/KnexClass');
const { options } = require('../../options/mariaDB');
const contenedor = new ContenedorDB(options, 'productos');

//---------ENDPOINTS---------

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
// POST '/api/producto' -> RECIBE Y AGREGA UN PRODUCTO, Y LO DEVUELVE CON SU ID ASIGNADO.
router.post('/', isAdmin, async (req, res) => {
	try {
		const productoId = await contenedor.save(req.body)
		res.send({ productoId });
	} catch (err) {
		console.log({err})
	}

});
// DELETE '/api/producto' -> BORRA TABLA DE PRODUCTOS.
router.delete('/', isAdmin, async (req, res) => {
	try {
		const ok = await contenedor.deleteAll()
		if (!ok) {
			res.send({
				error: 'Tabla no encontrada'
			});
		} else {
			res.send({
				message: 'Tabla eliminada'
			});
		}
	} catch (err) {
		console.log({err})
	}
});
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

module.exports = router;