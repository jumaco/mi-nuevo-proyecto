const mongoose = require('mongoose');
const config = require('../config')
import { asPOJO, renameField, removeField } from '../utils/objectUtils.js'

class ContenedorMongoDb {
	constructor(colection, esquema) {
		console.log('Construyendo desde ContenedorMongoDb')
		this.coleccion = mongoose.model(colection, esquema)
		this.init()
		console.log({colection}, {esquema})
		// console.log(esquema)
	}
	async init() {
		console.log('Iniciando conexion desde ContenedorMongoDb')
		// console.log(this.conection)
		try {
			if (!this.conection) {
				this.conection = await mongoose.connect(config.mongodb.host, config.mongodb.options)
				// console.log(this.conection)
			}
		} catch (error) {
			console.log('error al ejecutar', { error })
		}
	}
	async getById(id) {
		try {
			const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
			if (docs.length == 0) {
				throw new Error('Error al listar por id: no encontrado')
			} else {
				const result = renameField(asPOJO(docs[0]), '_id', 'id')
				return result
			}
		} catch (error) {
			throw new Error(`Error al listar por id: ${error}`)
		}
	};
	async getAll() {
		try {
			let docs = await this.coleccion.find({}, { __v: 0 }).lean()
			docs = docs.map(asPOJO)
			docs = docs.map(d => renameField(d, '_id', 'id'))
			return docs
		} catch (error) {
			throw new Error(`Error al listar todo: ${error}`)
		}
	};
	async save(nuevoElem) {
		try {
			let doc = await this.coleccion.create(nuevoElem);
			doc = asPOJO(doc)
			renameField(doc, '_id', 'id')
			removeField(doc, '__v')
			return doc
		} catch (error) {
			throw new Error(`Error al guardar: ${error}`)
		}
	};
	async updateById(nuevoElem) {
		try {
			renameField(nuevoElem, 'id', '_id')
			const { n, nModified } = await this.coleccion.replaceOne({ '_id': nuevoElem._id }, nuevoElem)
			if (n == 0 || nModified == 0) {
				throw new Error('Error al actualizar: no encontrado')
			} else {
				renameField(nuevoElem, '_id', 'id')
				removeField(nuevoElem, '__v')
				return asPOJO(nuevoElem)
			}
		} catch (error) {
			throw new Error(`Error al actualizar: ${error}`)
		}
	};
	async deleteById(id) {
		try {
			const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id })
			if (n == 0 || nDeleted == 0) {
				throw new Error('Error al borrar: no encontrado')
			}
		} catch (error) {
			throw new Error(`Error al borrar: ${error}`)
		}
	};
	async deleteAll() {
		try {
			await this.coleccion.deleteMany({})
		} catch (error) {
			throw new Error(`Error al borrar: ${error}`)
		}
	};
};

export default ContenedorMongoDb