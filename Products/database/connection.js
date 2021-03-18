const { Client } = require('pg');

const config = {
  user: 'lara',
  host: 'localhost',
  password: 'marley',
  port: 5432,
  database: 'SDC_products'
}

const client = new Client(config);

client.connect((err) => {
  if (err) {
    console.log("Connection error!", err)
  } else {
    console.log("Connection to DB successful")
  }
});

const getProductsById = function (req, res) {
  let id = Number(req.params.product_id)
  let featuresQuery = `SELECT
  features.feature,
  features.valueAttr
  FROM products_general
  INNER JOIN features ON products_general.product_id=features.product_id
  where (products_general.product_id = ${id});`
  let productsQuery = `SELECT * FROM products_general WHERE product_id=${id}`
  client.query(featuresQuery)
  .then((data) => {
    client.query(productsQuery)
    .then((data2) => {
      let featuresArr = data.rows;
      data2.rows[0]['features'] = featuresArr;
      res.send(data2.rows);
    })
  })
  .catch((error) => {
    res.send(error)
  })
}

module.exports = {
  client,
  getProductsById,
}