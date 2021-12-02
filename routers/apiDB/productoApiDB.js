// const express = require('express');
import express from 'express'
const isAdmin = require('../../middlewares/authAdmin');
const { Router } = express

const router = new Router()

// const ContenedorDB = require('../../models/KnexClass');
// const { options } = require('../../options/mariaDB');
// const contenedor = new ContenedorDB(options, 'productos');

import { productosDao as productosApi } from '../../src/daos/index.js'
// const { productosDao: productosApi } = require('../../src/daos/index.js')


//---------ENDPOINTS---------

// GET '/api/productos' -> DEVUELVE TODOS LOS PRODUCTOS.
router.get('/', async (req, res) => {
	try {
		console.log('Desde Router por DAOS')
		console.log({productosApi})
		const productos = await productosApi.getAll();
		res.json(productos);
	} catch (err) {
		console.log({ err })
	}

});
// GET '/api/productos/:id' -> DEVUELVE UN PRODUCTO SEGÚN SU ID.
router.get('/:id', async (req, res) => {
	try {
		const id = Number(req.params.id)
		const producto = await productosApi.getById(id);
		if (!producto) {
			res.send({
				error: 'producto no encontrado'
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
				error: 'Tabla no encontrada'
			});
		} else {
			res.send({
				message: 'Tabla eliminada'
			});
		}
	} catch (err) {
		console.log({ err })
	}
});
// PUT '/api/productos/:id' -> RECIBE Y ACTUALIZA UN PRODUCTO SEGÚN SU ID.
router.put('/:id', isAdmin, async (req, res) => {
	const productoUpadate = await productosApi.updateById(req.body, Number(req.params.id));
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
	const productoDelete = await productosApi.deleteById(Number(req.params.id))
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

export default router;