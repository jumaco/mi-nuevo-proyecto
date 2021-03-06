const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDB.js") 
const { asPOJO, renameField, removeField } = require('../../utils/objectUtils.js'
) 
class ChatDaoMongoDB extends ContenedorMongoDb {

	constructor() {
		super('chat', {
			author: { type: {}, required: true },
			text: { type: String, required: false },
			timestamp: { type: String, required: false },
			id: { type: String, required: false }
		})
	}

	async save(object = {}) {
		try {
			let array = [];
			array.push(object);
			let doc = await this.coleccion.create(...array);
			doc = asPOJO(doc)
			renameField(doc, '_id', 'id')
			removeField(doc, '__v')
			return doc

		} catch (error) {
			console.error(`Error al SALVAR: ${error}`)
		}
	}
}

module.exports = ChatDaoMongoDB
