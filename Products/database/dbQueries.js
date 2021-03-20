const db = require('./connection.js');

const getProducts = function (req, res) {
  let page;
  let count;
  (req.query.page ? page = Number(req.query.page) : page = 1);
  (req.query.count ? count = Number(req.query.count) : count = 5);
  let startProductId = (page-1) * count;
  let sql = `SELECT * FROM products_general WHERE product_id>${startProductId} LIMIT ${count}`
  db.query(sql, (error, results) => {
    res.send(results.rows)
  })
};

const getProductsById = function (req, res) {
  let id = Number(req.params.product_id)
  let featuresQuery = `SELECT
  features.feature,
  features.valueAttr
  FROM products_general
  INNER JOIN features ON products_general.product_id=features.product_id
  where (products_general.product_id = ${id});`
  let productsQuery = `SELECT * FROM products_general WHERE product_id=${id}`
  db.query(featuresQuery)
  .then((data) => {
    db.query(productsQuery)
    .then((data2) => {
      let featuresArr = data.rows;
      if (featuresArr === []) {
        res.send(data2.rows);
      }
      data2.rows[0]['features'] = featuresArr;
      res.send(data2.rows);
    })
  })
  .catch((error) => {
    res.send(error)
  })
}

const getProductStyle = function (req, res) {
  let id = Number(req.params.product_id)
  let styleQuery = `SELECT * FROM products_styles WHERE product_id =${id}`
  let skusquery = `SELECT
  style_skus.id,
  style_skus.size,
  style_skus.quantity,
  style_skus.style_id,
  products_styles.product_id
  FROM products_styles
  INNER JOIN style_skus ON products_styles.style_id=style_skus.style_id
  WHERE (products_styles.product_id = ${id})`;
  let photoQuery = `SELECT
  style_photos.id,
  style_photos.style_id,
  style_photos.photo_url,
  style_photos.thumbnail_url,
  products_styles.product_id
  FROM products_styles
  INNER JOIN style_photos ON products_styles.style_id=style_photos.style_id
  WHERE (products_styles.product_id = ${id})`
  db.query(styleQuery)
    .then((data)=>{
      db.query(skusquery)
      .then((data2) => {
        data.rows.forEach((styleRow) => {
          const skuArr= {};
          data2.rows.forEach((sku) =>{
            if (styleRow.style_id === sku.style_id) {
              skuArr[sku.id] = {quantity:sku.quantity, size:sku.size};
            }
          })
          styleRow['skus'] = skuArr;
        });
        res.send(data.rows)
      })
    })
}

module.exports = {
  getProducts,
  getProductsById,
  getProductStyle,
}

