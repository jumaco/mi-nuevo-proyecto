# Motores de plantillas
Desafio: Motores de plantillas

### En el directorio del proyecto, ejecutar:

### `npm i`

### Enciendo el server

### `npm start` (nodemon)
### `node server.js`

# ENDPOINTS EJS


# ENDPOINTS EXPRESS
GET `'/'` -> endpoint Inicial

## API Productos 

GET '``/api/productos``' -> devuelve todos los productos.

GET '``/api/productosRandom``' -> Devuelve un producto al azar

GET '``/api/consulta?1clave=valor&2clave=valor``' -> devuelve la consulta.

GET '``/api/productos/:id``' -> devuelve un producto según su id.

POST '``/api/productos``' -> recibe y agrega un producto, y lo devuelve con su id asignado.

PUT '``/api/productos/:id``' -> recibe y actualiza un producto según su id.

DELETE '``/api/productos/:id``' -> elimina un producto según su id.

## API Carrito

GET '``/api/carrito``' -> devuelve todos los productos.

GET '``/api/carrito/:id``' -> devuelve un producto según su id.

POST '``/api/carrito``' -> recibe y agrega un producto, y lo devuelve con su id asignado.

PUT '``/api/carrito/:id``' -> recibe y actualiza un producto según su id.

DELETE '``/api/carrito/:id``' -> elimina un producto según su id.