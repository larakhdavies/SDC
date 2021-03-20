const express = require('express')
const dbQuery = require('../database/dbQueries.js')
const app = express();
const port = 3000;

app.get('/products', dbQuery.getProducts);

app.get('/products/:product_id', dbQuery.getProductsById);

app.get('/products/:product_id/styles', dbQuery.getProductStyle);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})