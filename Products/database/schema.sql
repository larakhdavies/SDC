
CREATE TABLE products_general (
	product_id INT NOT NULL,
	product_name VARCHAR ( 50 ),
	slogan VARCHAR ( 500 ),
	product_description VARCHAR ( 500 ),
	category VARCHAR ( 50 ),
 default_price INT,
 PRIMARY KEY(product_id)
);

CREATE INDEX ix_pg_cproduct_id ON products_general (product_id);

\COPY products_general(product_id, product_name, slogan, product_description, category, default_price) FROM '/Users/laradavies/Desktop/product.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE related_products (
	id INT NOT NULL,
	current_product_id INT,
  related_product_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (current_product_id)
    REFERENCES products_general(product_id)
);

CREATE INDEX ix_rp_current_product_id ON related_products (current_product_id);

\COPY related_products(id, current_product_id, related_product_id) FROM '/Users/laradavies/Desktop/related.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE products_styles (
	style_id INT NOT NULL,
  product_id INT,
	style_name VARCHAR ( 50 ),
  sale_price INT,
  original_price INT,
  default_style BOOLEAN,
  PRIMARY KEY(style_id),
  CONSTRAINT style_fk
    FOREIGN KEY (product_id)
      REFERENCES products_general(product_id)
);

CREATE INDEX ix_ps_product_id ON products_styles (product_id);

\COPY products_styles(style_id, product_id, style_name, sale_price, original_price, default_style) FROM '/Users/laradavies/Desktop/styles.csv' DELIMITER ',' null as 'null' CSV HEADER;

CREATE TABLE style_skus (
	id INT NOT NULL,
	style_id INT,
  size VARCHAR ( 50 ),
  quantity VARCHAR ( 50 ),
  PRIMARY KEY(id),
  CONSTRAINT sku_fk
    FOREIGN KEY (style_id)
      REFERENCES products_styles(style_id)
);

CREATE INDEX ix_ss_style_id ON style_skus (style_id);

\COPY style_skus(id, style_id, size, quantity) FROM '/Users/laradavies/Desktop/skus.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE style_photos (
	id SERIAL,
  photo_id INT NOT NULL,
	style_id INT,
 photo_url VARCHAR ( 1000 ),
 thumbnail_url VARCHAR,
 PRIMARY KEY(id),
 CONSTRAINT photo_fk
    FOREIGN KEY (style_id)
      REFERENCES products_styles(style_id)
);

CREATE INDEX ix_sp_style_id ON style_photos (style_id);

\COPY style_photos(photo_id, style_id, photo_url, thumbnail_url) FROM '/Users/laradavies/Desktop/photos.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE features (
  id INT NOT NULL,
  product_id INT NOT NULL,
  feature VARCHAR ( 500 ),
  valueAttr VARCHAR ( 500 ),
  PRIMARY KEY (id),
  CONSTRAINT feature_fk
    FOREIGN KEY (product_id)
      REFERENCES products_general(product_id)
)

CREATE INDEX ix_feat_product_id ON features (product_id);

\COPY features(id, product_id, feature, valueAttr) FROM '/Users/laradavies/Desktop/features.csv' DELIMITER ',' CSV HEADER;
