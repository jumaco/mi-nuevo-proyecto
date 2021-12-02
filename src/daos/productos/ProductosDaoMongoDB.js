import ContenedorMongoDb from "../../contenedores/ContenedorMongoDB"


class ProductosDaoMongoDB extends ContenedorMongoDb {

	constructor() {
		super('productos', {
			title: { type: String, required: true },
			description: { type: String, required: true },
			code: { type: String, required: true },
			price: { type: Number, required: true },
			thumbnail: { type: String, required: true },
			stock: { type: Number, required: true },
			timestamp: { type: String, required: true },
		})
	}
}

export default ProductosDaoMongoDB