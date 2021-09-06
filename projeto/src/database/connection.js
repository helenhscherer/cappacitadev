//fazendo a conexão do banco de dados:

const databaseConfig = require('./knexfile')

//require do meu knex
const knex = require('knex')

//essa função retorna a conexão com o meu banco de dados
const databaseConnection = knex(databaseConfig)

//exportando a conexão
module.exports = {databaseConnection}
