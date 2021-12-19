const mongoose = require('mongoose');
const config = require('../config')
import { asPOJO, renameField, removeField } from '../utils/objectUtils.js'

class ContenedorMongoDb {
	constructor(colection, esquema) {
		console.log('Construyendo desde ContenedorMongoDb')
		this.coleccion = mongoose.model(colection, esquema)
		this.init()
		console.log({ colection }, { esquema })
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
				return null
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
	async updateById(nuevoElem, id) {
		try {
			console.log('Modificando producto contenedor mongo')
			console.log(nuevoElem)
			const { matchedCount, modifiedCount } = await this.coleccion.replaceOne({ '_id': id }, nuevoElem)
			console.log(matchedCount, modifiedCount)
			if (matchedCount == 0 || modifiedCount == 0) {
				return null
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
		console.log('Boorando desde contenedor')
		try {
			const {deletedCount} = await this.coleccion.deleteOne({ '_id': id })
			console.log(deletedCount)
			if (!deletedCount) {
				return null
			}else{
				return true
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