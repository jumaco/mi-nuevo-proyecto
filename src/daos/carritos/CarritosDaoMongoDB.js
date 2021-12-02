import ContenedorMongoDb from "../../contenedores/ContenedorMongoDB.js"

class CarritosDaoMongoDB extends ContenedorMongoDb {

	constructor() {
		super('carritos', {
			productos: { type: [], required: true }
		})
	}

	async saveCart(carrito = { productos: [] }) {
		return super.save(carrito)
	}
}

export default CarritosDaoMongoDB
