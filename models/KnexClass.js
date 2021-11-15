const knex = require('knex');
const { newTableMySQL } = require('../knex');


class ContenedorDB {
	constructor(opcion, tabla) {
		this.opcion = opcion;
		this.tabla = tabla;
		this.conexion = knex(opcion)
	}
	// RECIBE UN OBJETO, LO GUARDA EN EL ARCHIVO, DEVUELVE EL ID ASIGNADO.
	async save(producto) {
		try {
			const [id] = await this.conexion(this.tabla).insert(producto);
			return id;
		} catch (error) {
			if (error.errno === 1146) {
				await newTableMySQL(this.tabla, this.opcion)
				const [id] = await this.conexion(this.tabla).insert(producto);
				return id;
			}
			console.log('HUBO UN ERROR')
			console.error(error.errno); throw error;
		}
	}
	// RECIBE UN ID Y DEVUELVE EL OBJETO CON ESE ID, O NULL SI NO ESTÁ.
	async getById(id) {
		try {
			const contenido = await this.conexion().from(this.tabla)
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
	// DEVUELVE UN ARRAY CON LOS OBJETOS PRESENTES EN EL ARCHIVO.
	async getAll() {
		try {
			const rows = await this.conexion().from(this.tabla)
				.select('*');
			return rows;
		} catch (error) {
			console.error('Error:', error);
		}
	}
	// ELIMINA DEL ARCHIVO EL OBJETO CON EL ID BUSCADO.
	async deleteById(id) {
		try {
			await this.conexion().from(this.tabla).where('id', '=', id).del()
			return true
		} catch (error) {
			console.error('Error:', error);
		};
	}
	// ELIMINA TODOS LOS OBJETOS PRESENTES EN EL ARCHIVO.
	async deleteAll() {
		try {
			await fs.promises.writeFile(`./${this.file}`, '');
		} catch (error) {
			console.error('Error:', error);
		};
	}
	// RECIBE Y ACTUALIZA UN PRODUCTO SEGÚN SU ID.
	async updateById(id, element) {
		const list = await this.getAll();
		console.log({ list })
		console.log({ id })

		const elementSaved = list.find((item) => item.id === parseInt(id));
		const indexElementSaved = list.findIndex((item) => item.id === parseInt(id));
		console.log({ elementSaved })
		if (!elementSaved) {
			console.error(`Elemento con el id: '${id}' no fue encontrado`);
			return null;
		}

		const elementUpdated = {
			...elementSaved,
			...element
		};

		list[indexElementSaved] = elementUpdated;

		const elementsString = JSON.stringify(list, null, 2);
		await fs.promises.writeFile(`./${this.file}`, elementsString);

		return elementUpdated;
	}
}

module.exports = ContenedorDB;