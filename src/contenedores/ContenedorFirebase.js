const admin = require('firebase-admin')
const config = require('../config.js') 

admin.initializeApp({
	credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class ContenedorFirebase {
	constructor(nombreColeccion) {
		this.coleccion = db.collection(nombreColeccion)
	}
	async getById(id) {
		try {
			const doc = await this.coleccion.doc(id).get();
			if (!doc.exists) {
				return false
			} else {
				const data = doc.data();
				return { ...data, id }
			}
		} catch (error) {
			throw new Error(`Error al listar por id: ${error}`)
		}
	}
	async getAll() {
		try {
			const result = []
			const snapshot = await this.coleccion.get();
			snapshot.forEach(doc => {
				result.push({ id: doc.id, ...doc.data() })
			})
			return result
		} catch (error) {
			throw new Error(`Error al listar todo: ${error}`)
		}
	}
	async save(object) {
		try {
			const guardado = await this.coleccion.add({
				...object,
				timestamp: Date.now().toString()
			});
			return { ...object, id: guardado.id }
		} catch (error) {
			throw new Error(`Error al guardar: ${error}`)
		}
	}
	async updateById(object) {
		try {
			const actualizado = await this.coleccion.doc(object.id).set(object);
			return actualizado
		} catch (error) {
			throw new Error(`Error al actualizar: ${error}`)
		}
	}
	async deleteById(id) {
		try {
			const item = await this.coleccion.doc(id).delete();
			return item
		} catch (error) {
			throw new Error(`Error al borrar: ${error}`)
		}
	}
	async deleteAll() {
		try {
			const item = await this.coleccion.doc().delete();
			return item
		} catch (error) {
			throw new Error(`Error al borrar: ${error}`)
		}
	}
	async disconect() {
	}
}

module.exports = ContenedorFirebase