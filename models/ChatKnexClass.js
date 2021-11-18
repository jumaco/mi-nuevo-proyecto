const knex = require('knex');
const { newTableLite } = require('../knex');


class ContenedorDB {
	constructor(cliente, tabla) {
		this.cliente = cliente;
		this.tabla = tabla;
		this.conexion = knex(cliente)
	}
	// RECIBE UN MENSAJE, LO GUARDA EN DB, DEVUELVE EL ID ASIGNADO.
	async save(mensaje) {
		try {
			const [id] = await this.conexion(this.tabla)
				.insert(mensaje);
			return id;
		} catch (error) {
			if (error.errno === 1) {
				await newTableLite(this.tabla, this.cliente)
				const [id] = await this.conexion(this.tabla)
					.insert(mensaje);
				return id;
			}
			console.log('HUBO UN ERROR')
			console.error(error.errno); throw error;
		}
	}
	// DEVUELVE UN ARRAY CON LOS MENSAJES PRESENTES EN DB.
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
}

module.exports = ContenedorDB;