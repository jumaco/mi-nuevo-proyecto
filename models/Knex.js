const knex = require('knex');


class ContenedorDB {
    constructor(config, table) {
        this.table = table;
        this.conexion = knex(config);
    }
    // RECIBE UN OBJETO, LO GUARDA EN EL ARCHIVO, DEVUELVE EL ID ASIGNADO.
    async save(producto) {
        try {
            const [id] = await this.conexion(this.table).insert(producto);
            return id;
        } catch (error) {
            console.error(error); throw error;
        }
    }
    // RECIBE UN ID Y DEVUELVE EL OBJETO CON ESE ID, O NULL SI NO ESTÁ.
    async getById(id) {
        try {
            const contenido = await this.conexion.from(this.table)
                .select('*').where('id', '=', id);
            console.log({ contenido });
            if (contenido.length === 0) {
                return null;
            } else {
                return contenido[0];
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    // DEVUELVE UN ARRAY CON LOS OBJETOS PRESENTES EN EL ARCHIVO.
    async getAll() {
        try {
            const rows = await this.conexion.from(this.table)
                .select('*');
            return rows;
        } catch (error) {
            console.error('Error:', error);
        }
    }
    // CONST OBTENERRANDOMINFERIOR = (MIN, MAX) => MATH.ROUND(MATH.RANDOM() * (MAX - MIN + 1)) + MIN;


    // ELIMINA DEL ARCHIVO EL OBJETO CON EL ID BUSCADO.
    async deleteById(id) {
        try {
            const contenido = await fs.promises.readFile(`./${this.file}`, 'utf-8');
            const listaDeProducto = JSON.parse(contenido);
            if (listaDeProducto === '') {
            } else {
                const listaActualizada = listaDeProducto.filter(elemento => elemento.id === id);
                const listString = JSON.stringify(listaActualizada, null, 2);
                await fs.promises.writeFile(`./${this.file}`, listString);
            }
        } catch (error) {
            console.error('Error:', error);
        };
    }
    // ELIMINA TODOS LOS OBJETOS PRESENTES EN EL ARCHIVO.
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.file}`, '');
        } catch (error) {
            console.error('Error:', error);
        };
    }
    // RECIBE Y ACTUALIZA UN PRODUCTO SEGÚN SU ID.
    async updateById(id, element) {
        const list = await this.getAll();
        console.log({ list })
        console.log({ id })

        const elementSaved = list.find((item) => item.id === parseInt(id));
        const indexElementSaved = list.findIndex((item) => item.id === parseInt(id));
        console.log({ elementSaved })
        if (!elementSaved) {
            console.error(`Elemento con el id: '${id}' no fue encontrado`);
            return null;
        }

        const elementUpdated = {
            ...elementSaved,
            ...element
        };

        list[indexElementSaved] = elementUpdated;

        const elementsString = JSON.stringify(list, null, 2);
        await fs.promises.writeFile(`./${this.file}`, elementsString);

        return elementUpdated;
    }
}

module.exports = ContenedorDB;