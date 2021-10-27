const fs = require('fs')

class Carrito {
	constructor(file) {
		this.file = file;
	}
	//LECTURA DEL FILE
	async read() {
		const contenido = await fs.promises.readFile(`./${this.file}`, 'utf8');
		return contenido;
	}
	// RECIBE UN CARRITO, LO GUARDA EN EL ARCHIVO, DEVUELVE EL ID ASIGNADO.
	async save(object) {
		try {
			const contenido = await this.read();
			let array = []
			if (contenido === '') {
				object.id = 1;
				array.push(object);
			} else {
				const arrayObtenido = JSON.parse(contenido);
				const existe = arrayObtenido.find((item => item.id === object.id))
				if (existe) {
					let indexObject = arrayObtenido.findIndex((item => item.id === object.id))
					arrayObtenido[indexObject] = object
				} else {
					object.id = arrayObtenido[arrayObtenido.length - 1].id + 1;
					arrayObtenido.push(object);
				}
				array = arrayObtenido;
			}
			const objectsString = JSON.stringify(array, null, 2);
			await fs.promises.writeFile(`./${this.file}`, objectsString);
			return object.id;
		} catch (error) {
			console.log('error al ejecutar', { error })
		}
	}
	// RECIBE UN ID(ID DE CARRITO) Y DEVUELVE EL CARRITO CON ESE ID, O NULL SI NO ESTÁ.
	async getById(id) {
		try {
			const contenido = await this.read();
			const arrayObtenido = JSON.parse(contenido);
			let objectEncontrado = null
			arrayObtenido.map((object) => {
				if (object.id === id) {
					objectEncontrado = object;
				}
			})
			return objectEncontrado;
		} catch (error) {
			console.log('error al ejecutar', { error })
		}
	}
	// DEVUELVE UN ARRAY CON TODOS LOS CARRITOS PRESENTES EN EL ARCHIVO.
	async getAll() {
		try {
			const contenido = await this.read();
			if (contenido === '') {
				return [];
			} else {
				const arrayObtenido = JSON.parse(contenido);
				return arrayObtenido;
			};
		} catch (error) {
			console.log('error al ejecutar', { error })
		};
	};
	// ELIMINA DEL ARCHIVO EL CARRITO CON EL ID INGRESADO.
	async deleteById(id) {
		try {
			const contenido = await this.read();
			const arrayObtenido = JSON.parse(contenido);
			let encontrado = false
			arrayObtenido.map((object) => {
				if (object.id === id) {
					encontrado = true
					let indice = arrayObtenido.indexOf(object);
					arrayObtenido.splice(indice, 1);
				};
			});
			const arrayString = JSON.stringify(arrayObtenido, null, 2);
			await fs.promises.writeFile(`./${this.file}`, arrayString);
			return encontrado
		} catch (error) {
			console.log('error al ejecutar', { error });
		};
	};
	// ELIMINA TODOS LOS CARRITOS PRESENTES EN EL ARCHIVO.
	async deleteAll() {
		try {
			await fs.promises.writeFile(`./${this.file}`, '')
		} catch (error) {
			console.log('error al ejecutar', { error })
		}
	}
	// RECIBE Y ACTUALIZA UN CARRITO SEGÚN SU ID.
	async updateById(prod, id) {
		try {
			const producto = await this.getById(id);
			if (!producto) {
				return producto
			}
			const productoUpdated = {
				...producto,
				...prod
			}
			await this.save(productoUpdated)
			return productoUpdated;
		} catch (error) {
			console.log('error al ejecutar', { error })
		}
	}
};

module.exports = Carrito;