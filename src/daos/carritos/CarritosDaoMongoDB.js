const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDB.js") 
const { asPOJO, renameField, removeField } = require('../../utils/objectUtils.js') 

class CarritosDaoMongoDB extends ContenedorMongoDb {

	constructor() {
		super('carritos', {
			productos: { type: [], required: true },
			timestamp: { type: String, required: false },
		})
	}

	async save(object = {}, id = '') {
		try {
			let carro = {};
			let array = [];
			let arrayProductos = [];
			if (id === '') {
				arrayProductos.push({
					...object,
					count: 1
				});
				carro.timestamp = Date.now().toString();
				carro.productos = arrayProductos;
				array.push(carro);

				let doc = await this.coleccion.create(...array);
				doc = asPOJO(doc)
				renameField(doc, '_id', 'id')
				removeField(doc, '__v')
				return doc

			} else {
				let carro = await this.getById(id)
				const existe = carro.productos.find((item => item.id === object.id))
				if (existe) {
					existe.count += 1
					let indexExiste = carro.productos.findIndex((item => item.id === object.id))
					carro.productos.splice(indexExiste, 1);
					carro.productos.push(existe)
				} else {
					carro.productos.push({
						...object,
						count: 1
					});
				}
				super.updateById({ ...carro }, id);
				return carro
			}
		} catch (error) {
			console.error(`Error al SALVAR: ${error}`)
		}
	}


	// ELIMINA EL CARRITO CON EL ID INGRESADO O PRODUCTO EN CARRITO
	async deleteById(id, id_prod = 0) {
		try {
			const contenido = await this.getById(id)
			let encontrado = false;

			if (id_prod) {
				contenido.productos.map((object) => {
					encontrado = false;
					contenido.productos.map((ele) => {
						if (ele.id === id_prod) {
							// ELIMINA EL PRODUCTO EN CARRITO CON EL ID_PROD INGRESADO
							encontrado = true;
							let eleIndice = contenido.productos.indexOf(ele);
							contenido.productos.splice(eleIndice, 1);
						}
					})
					encontrado = super.updateById({ ...contenido }, id);
				})
			} else {
				// ELIMINA EL CARRITO CON EL ID INGRESADO
				encontrado = super.deleteById(id)
			}
			return encontrado
		} catch (error) {
			console.log('error al ejecutar', { error });
		};
	};

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
			await this.save(productoUpdated, id)
			return productoUpdated;
		} catch (error) {
			console.log('error al ejecutar', { error })
		}
	}
}

module.exports = CarritosDaoMongoDB
