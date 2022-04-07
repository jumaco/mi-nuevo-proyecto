const express = require('express');
const isAdmin = require('../../middlewares/authAdmin');
const { Router } = express

const router = new Router()

const { productosDao: productosApi } = require('../../daos/index.js')

//---------ENDPOINTS---------

// GET '/api/productos' -> DEVUELVE TODOS LOS PRODUCTOS.
router.get('/', async (req, res) => {
	try {
		const productos = await productosApi.getAll();
		console.log(productos)
		res.json(productos);
	} catch (err) {
		console.log({ err })
	}

});
// GET '/api/productos/:id' -> DEVUELVE UN PRODUCTO SEGÚN SU ID.
router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id
		const producto = await productosApi.getById(id);
		if (!producto) {
			res.send({
				error: 'Producto no encontrado'
			});
		} else {
			res.json(producto);
		}
	} catch (err) {
		console.log({ err })
	}

});
// POST '/api/producto' -> RECIBE Y AGREGA UN PRODUCTO, Y LO DEVUELVE CON SU ID ASIGNADO.
router.post('/', isAdmin, async (req, res) => {
	try {
		const productoId = await productosApi.save(req.body)
		res.send({ productoId });
	} catch (err) {
		console.log({ err })
	}

});
// DELETE '/api/producto' -> BORRA TABLA DE PRODUCTOS.
router.delete('/', isAdmin, async (req, res) => {
	try {
		const ok = await productosApi.deleteAll()
		if (!ok) {
			res.send({
				error: 'Producto no encontrado'
			});
		} else {
			res.send({
				message: 'Producto eliminado'
			});
		}
	} catch (err) {
		console.log({ err })
	}
});
// PUT '/api/productos/:id' -> RECIBE Y ACTUALIZA UN PRODUCTO SEGÚN SU ID.
router.put('/:id', isAdmin, async (req, res) => {
	const productoUpadate = await productosApi.updateById(req.body, req.params.id)
	if (!productoUpadate) {
		res.send({
			error: 'Producto no encontrado'
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
	const productoDelete = await productosApi.deleteById(req.params.id)
	if (!productoDelete) {
		res.send({
			error: 'Producto no encontrado'
		});
	} else {
		res.send({
			message: 'Producto eliminado'
		});
	}
});

module.exports = router, productosApi;