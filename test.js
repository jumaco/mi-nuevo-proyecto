const Carrito = require('./routers/api/CarritoClass');
//EL CARRITO DE COMPRAS TENDRÁ LA SIGUIENTE ESTRUCTURA: 
// id, timestamp(carrito), producto: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }

//{ ID, TIMESTAMP(PRODUCTO), NOMBRE, DESCRIPCION, CÓDIGO, FOTO (URL), PRECIO, STOCK }
//TIEMSTAMP GENERADO AL AGREGAR AL CARRITO
class Producto {
	constructor(id, timestamp, nombre, descripcion, código, fotoUrl, precio, cantidad) {
		this.id = id;
		this.timestamp = timestamp;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.código = código;
		this.fotoUrl = fotoUrl;
		this.precio = precio;
		this.cantidad = cantidad;
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

// const nuevoProducto = new Producto(5, Date.now(), "Registro de conducir", "Registros baratitos", 555, 'https://http2.mlstatic.com/D_NQ_NP_954041-MLA46302470460_062021-O.webp', 1200, 3)

// const nuevoCarro = new Carro(Date.now(), nuevoProducto)


const ejecutar = async () => {

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