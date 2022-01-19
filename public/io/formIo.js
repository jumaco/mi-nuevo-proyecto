const socket = io.connect();

//····················FORM·························
// CUANDO EL USUARIO ESCRIBA UN MENSAJE, EL SERVIDOR LO RECIBE COMO UN CHAT 'products' EVENTO
const form = document.getElementById('form');

form.addEventListener('submit', function (e) {
	e.preventDefault();
	let title = document.getElementById('nombre').value;
	let description = document.getElementById('descripcion').value;
	let code = document.getElementById('codigo').value;
	let price = document.getElementById('precio').value;
	let thumbnail = document.getElementById('foto').value;
	let stock = document.getElementById('stock').value;
	socket.emit('new-product', { title, description, code, price, thumbnail, stock });
	title = '';
	description.value = '';
	code.value = '';
	price.value = '';
	thumbnail.value = '';
	stock.value = '';
});

socket.on('products', (productos) => {
	const productList = productos.map((product) => `
		<tr>
			<td>
				${product.title}
			</td>
			<td>
				$ ${product.price}
			</td>
			<td>
				<img width="50" src=${product.thumbnail} alt="${product.title}">
			</td>
		</tr>
    `).join('');
	const list = document.getElementById('tabla');
	list.innerHTML = productList;
})


//····················CHAT·························


/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });

// Definimos un esquema de mensaje
const schemaMensaje = new normalizr.schema.Entity('message', { author: schemaAuthor }, { idAttribute: 'id' })

// Definimos un esquema de posts
const schemaMensajes = new normalizr.schema.Entity('messages', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })


// CUANDO EL USUARIO ESCRIBA UN MENSAJE, EL SERVIDOR LO RECIBE COMO UN CHAT 'chat message' EVENTO
const formChat = document.getElementById('formChat');
const inputMensaje = document.getElementById('inputMensaje')
const inputUsername = document.getElementById('username')


formChat.addEventListener('submit', function (e) {
	e.preventDefault();

	const message = {
		author: {
			email: inputUsername.value,
			nombre: document.getElementById('firstname').value,
			apellido: document.getElementById('lastname').value,
			edad: document.getElementById('age').value,
			alias: document.getElementById('alias').value,
			avatar: document.getElementById('avatar').value
		},
		text: inputMensaje.value
	}

	socket.emit('chat message', message);
	inputMensaje.value = '';
});

socket.on('chat historial', msg => {

	console.log(msg);
	const dataDenormalized = normalizr.denormalize(msg.result, schemaMensajes, msg.entities);
	console.log(dataDenormalized);

	let mensajesNsize = JSON.stringify(msg).length
	let mensajesD = normalizr.denormalize(msg.result, schemaMensajes, msg.entities)
	let mensajesDsize = JSON.stringify(mensajesD).length
	let porcentajeC = parseInt((mensajesNsize * 100) / mensajesDsize)
	document.getElementById('compresion-info').innerText = porcentajeC

	const productList = mensajesD.mensajes.map((mensaje) => `

	<div class="containerChat">
		<span class="time-right">${mensaje.author.email}</span>
		<img src=${mensaje.author.avatar}" alt="Avatar">
		<p>${mensaje.text}</p>
		<span class="time-right">${mensaje.timestamp}</span>
	</div>

    `).join('');
	let messages = document.getElementById('messages');
	messages.innerHTML = productList;
});