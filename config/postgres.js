const { Client } = require('pg')

const connectionData = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORTDB,
  }
  const client = new Client(connectionData)


module.exports = client