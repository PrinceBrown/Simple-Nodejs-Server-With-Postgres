const {Client} = require('pg')

const connection = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'someCrazyPassword',
    port: 5432,
})

connection.connect()

module.exports = connection


