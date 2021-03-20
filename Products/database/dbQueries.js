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

const getFeatures = function (id) {
  let featuresQuery = `SELECT
  features.feature,
  features.valueAttr
  FROM products_general
  INNER JOIN features ON products_general.product_id=features.product_id
  where (products_general.product_id = ${id});`
  return db.query(featuresQuery);
}

const getProductsFunc = function (id){
  let productsQuery = `SELECT * FROM products_general WHERE product_id=${id}`
  return db.query(productsQuery)
}

const getProductsById = function (req, res) {
  let id = Number(req.params.product_id)
  getFeatures(id)
  .then((features) => {
    getProductsFunc(id)
    .then((produtcs) => {
      let featuresArr = features.rows;
      if (featuresArr === []) {
        res.send(produtcs.rows);
      }
      produtcs.rows[0]['features'] = featuresArr;
      res.send(produtcs.rows);
    })
  })
  .catch((error) => {
    res.send(error)
  })
}

const getStylesQuery = function (id) {
  let styleQuery = `SELECT * FROM products_styles WHERE product_id =${id}`
  return db.query(styleQuery)
}

const getSkusQuery = function (id) {
  let skusquery = `SELECT
  style_skus.id,
  style_skus.size,
  style_skus.quantity,
  style_skus.style_id,
  products_styles.product_id
  FROM products_styles
  INNER JOIN style_skus ON products_styles.style_id=style_skus.style_id
  WHERE (products_styles.product_id = ${id})`;
  return db.query(skusquery)
}

const getPhotosQuery = function (id) {
  let photoQuery = `SELECT
  style_photos.id,
  style_photos.style_id,
  style_photos.photo_url,
  style_photos.thumbnail_url,
  products_styles.product_id
  FROM products_styles
  INNER JOIN style_photos ON products_styles.style_id=style_photos.style_id
  WHERE (products_styles.product_id = ${id})`
  return db.query(photoQuery)
}

const getProductStyle = function (req, res) {
  let id = Number(req.params.product_id)
  getStylesQuery(id)
    .then((data)=>{
      getSkusQuery(id)
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
      })
      getPhotosQuery(id)
      .then((data3) => {
        debugger;
        data.rows.forEach((styleRow) => {
          const photosArr = [];
          data3.rows.forEach((photoRow) => {
            if(photoRow.style_id === styleRow.style_id) {
              photosArr.push(photoRow)
            }
          })
          styleRow["photos"] = photosArr;
        })
        res.send(data.rows)
      })
    })
}

const getproductPhotos = function (req, res) {
  let id = Number(req.params.product_id);
  let photoQuery = `SELECT
  style_photos.id,
  style_photos.style_id,
  style_photos.photo_url,
  style_photos.thumbnail_url,
  products_styles.product_id
  FROM products_styles
  INNER JOIN style_photos ON products_styles.style_id=style_photos.style_id
  WHERE (products_styles.product_id = ${id})`
  db.query(photoQuery)
  .then((data) => {
    res.send(data.rows)
  })
};

const getProductsRelated = function (req, res) {
  let id = Number(req.params.product_id);
  let relatedQuery = `SELECT
  related_products.id,
  related_products.current_product_id,
  related_products.related_product_id,
  products_general.product_id
  FROM products_general
  INNER JOIN related_products ON products_general.product_id=related_products.current_product_id
  WHERE (products_general.product_id = ${id})`
  db.query(relatedQuery)
  .then((data) => {
    relatedProductsArr = [];
    data.rows.forEach((row) => {
      relatedProductsArr.push(row.related_product_id);
    })
    res.send(relatedProductsArr);
  })
  .catch((error) => {
    res.send(error)})
}

module.exports = {
  getProducts,
  getProductsById,
  getProductStyle,
  getproductPhotos,
  getProductsRelated,
}

