const fs = require('fs')
const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js") 

class CarritosDaoArchivo extends ContenedorArchivo {
	constructor() {
		super('./db/carrito.json')
	}

	// RECIBE UN CARRITO, LO GUARDA EN EL ARCHIVO, DEVUELVE EL ID ASIGNADO.
	async save(object = {}, id = 0) {
		try {
			const contenido = await this.read();
			let carro = {};
			let array = [];
			let arrayProductos = [];
			if (contenido === '') {
				carro.id = 1;
				arrayProductos.push(object);
				carro.timestamp = Date.now().toString();
				carro.productos = arrayProductos;
				array.push(carro);
			} else {
				const arrayObtenido = JSON.parse(contenido);
				const existeCarro = arrayObtenido.find((item => item.id.toString() === id));
				if (existeCarro) {
					let indexCarro = arrayObtenido.findIndex((item => item.id.toString() === id));
					const existeProductoEnCarro = arrayObtenido[indexCarro].productos.find((item => item.id === object.id));
					if (existeProductoEnCarro) {
						console.log(existeProductoEnCarro);
					} else {
						arrayObtenido[indexCarro].productos.push(object);
					}
				} else {
					carro.id = arrayObtenido[arrayObtenido.length - 1].id + 1;
					arrayProductos.push(object);
					carro.timestamp = Date.now().toString();
					carro.productos = arrayProductos;
					arrayObtenido.push(carro);
				}
				array = arrayObtenido;
			}
			const objectsString = JSON.stringify(array, null, 2);
			await fs.promises.writeFile(`./${this.file}`, objectsString);
			return carro.id;
		} catch (error) {
			console.log('error al ejecutar', { error })
		}
	}

	
	// ELIMINA DEL ARCHIVO EL CARRITO CON EL ID INGRESADO.
	async deleteById(id, id_prod = 0) {
		try {
			const contenido = await this.read();
			const arrayObtenido = JSON.parse(contenido);
			let encontrado = false;
			arrayObtenido.map((object) => {
				if (object.id.toString() === id) {
					encontrado = true;
					if (id_prod) {
						encontrado = false;
						object.productos.map((ele) => {
							if (ele.id.toString() === id_prod) {
								encontrado = true;
								let eleIndice = object.productos.indexOf(ele);
								object.productos.splice(eleIndice, 1);
							}
						})
					} else {
						let indice = arrayObtenido.indexOf(object);
						arrayObtenido.splice(indice, 1);
					}
				}
			})
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
}

module.exports = CarritosDaoArchivo
