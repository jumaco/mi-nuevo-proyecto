const Contenedor = require('./models/ProductoClass')

const contenedor = new Contenedor('./db/productos.json')


var anyid = require('anyid').anyid;
const codeRandom = anyid().encode('0').length(8).random();
const stockRandom = anyid().encode('0').length(3).random();
const priceRandom = anyid().encode('0')
	.section(anyid().length(5).random())
	.delimiter(',')
	.section(anyid().length(2).random());;;
// console.log(ids.id());

const Carrito = require('./models/CarritoClass');
//EL CARRITO DE COMPRAS TENDRÁ LA SIGUIENTE ESTRUCTURA: 
// id, timestamp(carrito), producto: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }

//{ ID, TIMESTAMP(PRODUCTO), NOMBRE, DESCRIPCION, CÓDIGO, FOTO (URL), PRECIO, STOCK }
//TIEMSTAMP GENERADO AL AGREGAR AL CARRITO
class Producto {
	constructor(title, description, code, thumbnail, price, stock) {
		// this.id = id;
		this.title = title;
		this.description = description;
		this.code = code;
		this.thumbnail = thumbnail;
		this.price = price;
		this.stock = stock;
	}
}

//TIMESTAMP(CARRITO), PRODUCTO:[]
class Carro {
	constructor(timestamp, producto) {
		this.timestamp = timestamp;
		this.producto = [producto];
	}
}

const carrito = new Carrito('./db/carrito.json')

const nuevoProducto = new Producto(
	"Freezer horizontal Patrick",
	"FHP420 blanco 383L 220V",
	codeRandom.id(),
	'https://http2.mlstatic.com/D_NQ_NP_2X_711928-MLA41254319676_032020-V.webp',
	priceRandom.id(),
	stockRandom.id()
)

// const nuevoCarro = new Carro(Date.now(), nuevoProducto)


const ejecutar = async () => {
	// METODOS CONTENEDOR
	const id = await contenedor.save(nuevoProducto);
	console.log(id);

	// const all = await contenedor.getAll();
	// console.log(all);

	// await contenedor.deleteAll()

	// const getId = await contenedor.getById(5)
	// console.log(getId)

	// const deleteById = contenedor.deleteById(5)

	// METODOS CARRITO
	// const id = await carrito.save(nuevoCarro);
	// console.log(id);

	// const all = await carrito.getAll();
	// console.log(all);

	// await carrito.deleteAll()

	// const getId = await carrito.getById(3)
	// console.log(getId)

	// const deleteById = await carrito.deleteById(2)

}

ejecutar()