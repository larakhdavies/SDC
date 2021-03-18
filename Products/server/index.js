const express = require('express')
const connection = require('../database/connection.js')
const app = express()
const port = 3000

app.get('/products', (req, res) => {
  debugger;
  let page;
  let count;
  (req.query.page ? page = Number(req.query.page) : page = 1);
  (req.query.count ? count = Number(req.query.count) : count = 5);
  let startProductId = (page-1) * count;
  let sql = `SELECT * FROM products_general WHERE product_id>${startProductId} LIMIT ${count}`
  debugger;
  connection.client.query(sql, (error, results) => {
    debugger;
    res.send(results.rows)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})