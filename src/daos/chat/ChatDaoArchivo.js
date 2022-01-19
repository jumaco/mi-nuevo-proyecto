const fs = require('fs')
import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"

class ChatDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('./db/chat.json')
    }
    async save(elem) {
        const elems = await this.read();
        const arrayObtenido = JSON.parse(elems);
        let newId
        if (arrayObtenido.length == 0) {
            newId = 1
        } else {
            newId = arrayObtenido[arrayObtenido.length - 1].id + 1
        }
        const newElem = { ...elem, id: newId }
        arrayObtenido.push(newElem)
        const objectsString = JSON.stringify(arrayObtenido, null, 2);
        try {
            await fs.promises.writeFile(`./${this.file}`, objectsString);
            return true
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }
}

export default ChatDaoArchivo
