const mongoose = require('mongoose');
const config = require('../config')
const { asPOJO, renameField, removeField } = require('../utils/objectUtils.js') 

require('dotenv').config()

let conexion = process.env.storage === 'mongodb' ? config.mongodb.host : config.mongoRemote.host;
let opciones = process.env.storage === 'mongodb' ? config.mongodb.options : config.mongoRemote.options;

class ContenedorMongoDb {
	
	constructor(colection, esquema) {
		this.coleccion = mongoose.model(colection, esquema)
		this.init()
		this.estado = false
	}
	async init() {
		try {
			if (!this.conection) {
				this.conection = await mongoose.connect(conexion, opciones)
				this.estado = true
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
		nuevoElem.timestamp = Date.now().toString();
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
			const { matchedCount, modifiedCount } = await this.coleccion.replaceOne({ '_id': id }, nuevoElem)
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
		try {
			const {deletedCount} = await this.coleccion.deleteOne({ '_id': id })
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

module.exports = ContenedorMongoDb