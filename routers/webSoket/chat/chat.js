const express = require('express')
const { Router } = express
const path = require('path')

const router = new Router()

router.get('/', (req, res) => {
    console.log("CHAT route called");
    res.sendFile(path.join(__dirname, '../../../public/io', 'index.html'));

    const { app } = req

    const Chat = require('../../../models/ApiChat')
    const chat = new Chat('./db/chat.json')

    let io = app.get('io');

    io.on('connection', async (socket) => {
        // "CONNECTION" SE EJECUTA LA PRIMERA VEZ QUE SE ABRE UNA NUEVA CONEXIÓN
        console.log(`Usuario conectado ${socket.id}`);

        const mensajes = await chat.getAll();
        io.sockets.emit('chat historial', mensajes);

        // SE IMPRIMIRÁ SOLO LA PRIMERA VEZ QUE SE HA ABIERTO LA CONEXIÓN
        socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor');

        // ESCUCHA EL SERVIDOR AL CLIENTE
        socket.on('notificacion', data => {
            console.log(data);
        });

        /*ESCUCHO LOS MENSAJES ENVIADOS POR EL CLIENTE Y SE LOS PROPAGO A TODOS*/
        socket.on('mensaje', data => {
            mensajes.push({ socketid: socket.id, mensaje: data });
            io.sockets.emit('mensajes', mensajes);
        });

        // SE IMPRIMIRÁ SOLO CUANDO SE CIERRE LA CONEXIÓN
        socket.on('disconnect', () => {
            console.log(`Usuario desconectado ${socket.id}`);
        });

        /*ESCUCHO LOS MENSAJES CHAT ENVIADOS, LOS GUARDO EN CHAT.JSON*/
        socket.on('chat message', async (msg) => {
            let userId = socket.id
            console.log(`chat: ${msg.usuario} dice: ${msg.mensaje}`);
            await chat.save({
                ...msg,
                userId
            });
        });

        //DIFUSIÓN
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });
    })
})

export default router;