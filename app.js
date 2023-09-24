require("dotenv").config()

const express = require("express")
const cors = require("cors")
const dbConnect = require('./config/postgres')
const app = express()

const { Client } = require('pg')

app.use(cors())

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`localhost:${port}`)
})

dbConnect.connect()
dbConnect.query('SELECT * FROM shop.subCursal')
.then(response => {
    console.log(response.rows)
    dbConnect.end()
})
.catch(err => {
    dbConnect.end()
})
