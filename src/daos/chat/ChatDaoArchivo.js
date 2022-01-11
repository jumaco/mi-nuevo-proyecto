const fs = require('fs')
import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"

class ChatDaoArchivo extends ContenedorArchivo {
	constructor() {
		super('./db/chat.json')
	}
}

export default ChatDaoArchivo
