const express = require('express')
const { Router } = express

const router = new Router()

// const Carrito = require('../../models/CarritoClass');
// const carrito = new Carrito('./db/carrito.json');

const { carritosDao : carritosApi } = require('../../daos/index.js') 

//---------ENDPOINTS---------

// POST '/api/carrito' -> CREA UN CARRITO Y DEVUELVE SU ID
router.post('/', async (req, res) => {
	const idCarrito = await carritosApi.save(req.body)
	res.send({ idCarrito });
});

//DELETE: '/:id' - ELIMINA UN CARRITO POR SU ID.
router.delete('/:id', async (req, res) => {
	const carroDelete = await carritosApi.deleteById(req.params.id)
	if (!carroDelete) {
		res.send({
			error: 'Carrito no encontrado'
		});
	} else {
		res.send({
			message: 'Carrito eliminado'
		});
	}
});

//GET: '/:id/productos' - ME PERMITE LISTAR TODOS LOS PRODUCTOS GUARDADOS EN EL CARRITO
router.get('/:id/productos', async (req, res) => {
	const userCarrito = await carritosApi.getById(req.params.id)
	const { productos } = userCarrito
	if (!userCarrito) {
		res.send({
			error: 'Carrito no encontrado'
		});
	} else {
		if (!productos) {
			res.send({
				empty: 'Carrito sin productos'
			});
		} else {
			res.json(productos);
		}
	}
});

//POST: '/:id/productos' - PARA INCORPORAR PRODUCTOS AL CARRITO POR SU ID
router.post('/:id/productos', async (req, res) => {
	const idCarrito = await carritosApi.save(req.body, req.params.id)
	res.send({ idCarrito });
});

//DELETE: '/:id/productos/:id_prod' - ELIMINAR UN PRODUCTO DEL CARRITO POR SU ID DE CARRITO Y DE PRODUCTO
router.delete('/:id/productos/:id_prod', async (req, res) => {
	const ProductoDelCarroDelete = await carritosApi.deleteById(req.params.id, req.params.id_prod)
	if (!ProductoDelCarroDelete) {
		res.send({
			error: 'producto no encontrado'
		});
	} else {
		res.send({
			message: 'Producto eliminado'
		});
	}
});



// GET '/api/carrito' -> DEVUELVE TODOS LOS carritos.
router.get('/', async (req, res) => {
	const productos = await carritosApi.getAll();
	res.json(productos);
});

// GET '/api/carrito/:id' -> DEVUELVE UN CARRITO SEGÚN SU ID.
router.get('/:id', async (req, res) => {
	const id = req.params.id
	const producto = await carritosApi.getById(id);
	if (!producto) {
		res.send({
			error: 'Carrito no encontrado'
		});
	} else {
		res.json(producto);
	}
});

// PUT '/api/carrito/:id' -> RECIBE Y ACTUALIZA UN CARRITO SEGÚN SU ID.
router.put('/:id', async (req, res) => {
	const productoUpadate = await carritosApi.updateById(req.body, req.params.id)
	if (!productoUpadate) {
		res.send({
			error: 'Carrito no encontrado'
		});
	} else {
		res.send({
			message: 'success',
			data: productoUpadate
		});
	}
});

module.exports = router;