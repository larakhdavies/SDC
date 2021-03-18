
-- \COPY features(id, product_id, feature, valueAttr) FROM '/Users/laradavies/Desktop/features.csv' DELIMITER ',' CSV HEADER;

-- CREATE TABLE products_general (
-- 	product_id INT NOT NULL,
-- 	product_name VARCHAR ( 50 ),
-- 	slogan VARCHAR ( 500 ),
-- 	product_description VARCHAR ( 500 ),
-- 	category VARCHAR ( 50 ),
--  default_price INT,
--  PRIMARY KEY(product_id)
-- );

-- CREATE TABLE related_products (
-- 	id INT NOT NULL,
-- 	related_product_id INT,
--   product_id INT,
--   PRIMARY KEY(id),
--   FOREIGN KEY (product_id)
--     REFERENCES products_general(product_id)
-- );

-- CREATE TABLE products_styles (
-- 	style_id INT NOT NULL,
--   product_id INT,
-- 	style_name VARCHAR ( 50 ),
--   sale_price INT,
--   original_price INT,
--   default_style BOOLEAN,
--   PRIMARY KEY(style_id),
--   CONSTRAINT style_fk
--     FOREIGN KEY (product_id)
--       REFERENCES products_general(product_id)
-- );

-- CREATE TABLE style_skus (
-- 	id INT NOT NULL,
-- 	style_id INT,
--   size VARCHAR ( 50 ),
--   quantity VARCHAR ( 50 ),
--   PRIMARY KEY(id),
--   CONSTRAINT sku_fk
--     FOREIGN KEY (style_id)
--       REFERENCES products_styles(style_id)
-- );

-- CREATE TABLE style_photos (
-- 	id SERIAL,
--   photo_id INT NOT NULL,
-- 	style_id INT,
--  photo_url VARCHAR ( 1000 ),
--  thumbnail_url VARCHAR,
--  PRIMARY KEY(id),
--  CONSTRAINT photo_fk
--     FOREIGN KEY (style_id)
--       REFERENCES products_styles(style_id)
-- );

-- CREATE TABLE features (
--   id INT NOT NULL,
--   product_id INT NOT NULL,
--   feature VARCHAR ( 250 ),
--   valueAttr VARCHAR ( 250 ),
--   PRIMARY KEY (id),
--   CONSTRAINT feature_fk
--     FOREIGN KEY (product_id)
--       REFERENCES products_general(product_id)
-- )

-- ALTER TABLE products_general DROP features_;
