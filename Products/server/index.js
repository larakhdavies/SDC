const express = require('express')
const connection = require('../database/connection.js')
const app = express()
const port = 3000

app.get('/products', (req, res) => {
  let page;
  let count;
  (req.query.page ? page = Number(req.query.page) : page = 1);
  (req.query.count ? count = Number(req.query.count) : count = 5);
  let startProductId = (page-1) * count;
  let sql = `SELECT * FROM products_general WHERE product_id>${startProductId} LIMIT ${count}`
  connection.client.query(sql, (error, results) => {
    res.send(results.rows)
  })
})


app.get('/products/:product_id', connection.getProductsById);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})