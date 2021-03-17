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

module.exports = {
  client,
}