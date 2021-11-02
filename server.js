const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//    res.status(404).send({
//       error: -2,
//       descripcion: `ruta 'x' método 'y' no implementada`
//    });
// });


//MÓDULOS DE DIRECCIONAMIENTO ROUTER

const productos = require('./routers/api/productoApi');
const carrito = require('./routers/api/carritoApi');

// ENDPOINTS EXPRESS

// GET '/' -> ENDPOINT INICIAL
const PATH = '/';

const callback = (request, response, next) => {
   response.send({ mensaje: 'HOLA MUNDO! DIRIGETE A /api/productos O /api/carrito' });
};

app.get(PATH, callback);

//-----ROUTERS-----

app.use('/api/productos', productos)

app.use('/api/carrito', carrito)

//-----FIN ROUTERS-----

// ENCIENDO EL SERVER
const callbackInit = () => {
   console.log(`Servidor corriendo en: http://localhost:${PORT}`);
};
app.listen(PORT, callbackInit);

// MANEJO DE ERRORES
app.on("error", error => console.log(`Error en servidor ${error}`))
