const ContenedorArchivo = require("../../contenedores/ContenedorArchivo.js") 

class ProductosDaoArchivo extends ContenedorArchivo {
	constructor() {
		super('./db/productos.json')
	}
}

module.exports = ProductosDaoArchivo
