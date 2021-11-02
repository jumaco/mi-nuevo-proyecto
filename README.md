# Motores de plantillas
## Primera entrega Proyecto Final

### En el directorio del proyecto, ejecutar:

### `npm i`

### Enciendo el server

### `npm start` (nodemon)
### `node server.js`

# ENDPOINTS EJS


# ENDPOINTS EXPRESS
GET `'/'` -> endpoint Inicial

## API Productos 

GET `'/api/productos'` -> devuelve todos los productos.

GET `'/api/productos/:id'` -> devuelve un producto según su id.

POST `'/api/productos'` -> recibe y agrega un producto, y lo devuelve con su id asignado.

PUT `'/api/productos/:id'` -> recibe y actualiza un producto según su id.

DELETE `'/api/productos/:id'` -> elimina un producto según su id.
### EXTRA
GET `'/api/productosRandom'` -> Devuelve un producto al azar

GET `'/api/consulta?1clave=valor&2clave=valor'` -> devuelve la consulta.


## API Carrito

POST `'/api/carrito'` -> Crea un carrito y devuelve su id.

DELETE: `'/api/carrito/:id'` - Elimina un carrito por su id.

GET: `'/api/carrito/:id/productos'` - Me permite listar todos los productos guardados en el carrito.

POST: `'/api/carrito/:id/productos'` - Para incorporar productos al carrito por su id.

DELETE: `'/api/carrito/:id/productos/:id_prod'` - Eliminar un producto del carrito por su id de carrito y de producto.
### EXTRA
GET `'/api/carrito'` -> devuelve todos los carritos.

GET `'/api/carrito/:id'` -> devuelve un carritos según su id.

POST `'/api/carrito'` -> recibe y agrega un carrito, y lo devuelve con su id asignado.

PUT `'/api/carrito/:id'` -> recibe y actualiza un carrito según su id.

