const express = require('express')
const { Router } = express

const router = new Router()

const Producto = require('./ProductoClass');
const contenedor = new Producto('./db/productos.json');

//---------ENDPOINTS---------

//Crea un carrito y devuelve su id.

// POST '/api/carrito' -> RECIBE Y AGREGA UN carrito, Y LO DEVUELVE CON SU ID ASIGNADO.
router.post('/', async (req, res) => {
	await contenedor.save(req.body)
	res.send(req.body);
});

//DELETE: '/:id' - Vacía un carrito y lo elimina.

// DELETE '/api/carrito/:id' -> ELIMINA UN PRODUCTO SEGÚN SU ID.
router.delete('/:id', async (req, res) => {
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


// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito





// GET '/api/carrito' -> DEVUELVE TODOS LOS carritos.
router.get('/', async (req, res) => {
	const productos = await contenedor.getAll();
	res.json(productos);
});

// GET '/api/carrito/:id' -> DEVUELVE UN carrito SEGÚN SU ID.
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



// PUT '/api/carrito/:id' -> RECIBE Y ACTUALIZA UN PRODUCTO SEGÚN SU ID.
router.put('/:id', async (req, res) => {
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




module.exports = router;