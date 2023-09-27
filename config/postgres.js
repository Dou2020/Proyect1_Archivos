const { Client } = require('pg')

const connectionData = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORTDB,
  }

module.exports = {
  connect(){
    const client = new Client(connectionData)
    client.connect()
    return client
  }
}