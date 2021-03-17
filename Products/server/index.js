const express = require('express')
const connection = require('../database/connection.js')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  connection.client.query('SELECT * FROM products_general LIMIT 5', (error, results) => {
    res.send(results.rows)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})