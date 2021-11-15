// VINCULA CONTRA SERVIDOR
const socket = io(); // YA PODEMOS EMPEZAR A USAR LOS SOCKETS DESDE EL CLIENTE :)

// ESCUCHA DEL CLIENTE
socket.on('mi mensaje', data => {
	alert(data)
	socket.emit('notificacion', `Notificacion de ${socket.id}: Mensaje recibido exitosamente!!!`)
})

// CUANDO EL USUARIO ESCRIBA UN MENSAJE, EL SERVIDOR LO RECIBE COMO UN CHAT 'chat message' EVENTO
const formChat = document.getElementById('formChat');
const input = document.getElementById('input');
const username = document.getElementById('username');
const message = {
	input,
	username
}

formChat.addEventListener('submit', function (e) {
	e.preventDefault();
	if (input.value) {
		let mensaje = input.value;
		let usuario = username.value;
		socket.emit('chat message', { mensaje, usuario, });
		input.value = '';
	}
});

socket.on('chat historial', function (msg) {
	console.log(msg);
	let messages = document.getElementById('messages');
	msg.map((mensaje) => {
		if (mensaje.usuario != undefined && mensaje.mensaje != undefined) {
			let item = document.createElement('li');
			item.textContent = `${mensaje.usuario}: ${mensaje.mensaje}`;
			messages.appendChild(item);
		}

	})
});

socket.on('chat message', function (msg) {
	let item = document.createElement('li');
	item.textContent = `${msg.usuario}: ${msg.mensaje}`;
	messages.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
});