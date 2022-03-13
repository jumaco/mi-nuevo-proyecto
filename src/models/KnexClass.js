const knex = require('knex');
const { newTableMySQL } = require('../scripts/knex');


class ContenedorDB {
	constructor(cliente, tabla) {
		this.cliente = cliente;
		this.tabla = tabla;
		this.conexion = knex(cliente)
	}
	// RECIBE UN PRODUCTO, LO GUARDA EN EL ARCHIVO, DEVUELVE EL ID ASIGNADO.
	async save(producto) {
		try {
			const [id] = await this.conexion(this.tabla)
				.insert(producto);
			return id;
		} catch (error) {
			if (error.errno === 1146) {
				await newTableMySQL(this.tabla, this.cliente)
				const [id] = await this.conexion(this.tabla)
					.insert(producto);
				return id;
			}
			console.log('HUBO UN ERROR')
			console.error(error.errno); throw error;
		}
	}
	// RECIBE UN ID Y DEVUELVE EL PRUDUCTO CON ESE ID, O NULL SI NO ESTÁ.
	async getById(id) {
		try {
			const contenido = await this.conexion(this.tabla)
				.from(this.tabla)
				.select('*').where('id', '=', id);
			if (contenido.length === 0) {
				return null;
			} else {
				return contenido[0];
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
	// DEVUELVE UN ARRAY CON LOS PRODUCTOS PRESENTES EN EL ARCHIVO.
	async getAll() {
		try {
			const rows = await this.conexion(this.tabla)
				.from(this.tabla)
				.select('*');
			return rows;
		} catch (error) {
			console.error('Error:', error);
		}
	}
	// ELIMINA DE DB EL PRUDUCTO SEGUN EL ID.
	async deleteById(id) {
		try {
			await this.conexion(this.tabla)
				.from(this.tabla)
				.where('id', '=', id)
				.del()
			return true
		} catch (error) {
			console.error('Error:', error);
		};
	}
	// ELIMINA LA TABLA EN DB.
	async deleteAll() {
		try {
			await this.conexion(this.tabla)
				.from(this.tabla)
				.del()
			return true
		} catch (error) {
			console.error('Error:', error);
		};
	}
	// RECIBE Y ACTUALIZA UN PRODUCTO SEGÚN SU ID.
	async updateById(element, id) {
		try {
			await this.conexion(this.tabla).from(this.tabla).where('id', '=', id).update(element)
			const productoActualizado = await this.conexion(this.tabla)
				.from(this.tabla)
				.select('*')
				.where('id', '=', id);
			return productoActualizado
		} catch (error) {
			console.error('Error:', error);
		};
	}
}

module.exports = ContenedorDB;