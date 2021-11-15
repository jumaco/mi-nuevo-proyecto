// const { option } = require('./options/mariaDB')
const knex = require('knex')

const newTableMySQL = async (tabla, cliente) => {
    // const conexion = require('knex')

    await knex(cliente).schema.createTable(tabla, table => {
        table.increments('id')
        table.string('title')
        table.string('description')
        table.string('code')
        table.string('price')
        table.string('thumbnail')
        table.string('stock')
        table.string('timestamp')
    })
        .then(() => console.log(`tabla ${tabla} creada`))
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
            knex(cliente).destroy();
        })
}

const newTableLite = async (tabla, cliente) => {
    const knex = require('knex')(cliente)
    try {
        await knex.schema.createTable(tabla, table => {
            table.increments('id')
            table.string('usuario')
            table.string('userId')
            table.string('mensaje')
        })
            .then(() => console.log(`tabla ${tabla} creada`))
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                knex.destroy()
            })
    } catch (error) {
        console.error(error); throw error;
    }
}

module.exports = {
    newTableMySQL,
    newTableLite
}