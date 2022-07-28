Run the following command

1.run source exportdev.sh
2.npm install
3.node index.js or DEBUG="v1:*" node index.js

APIs:

1. Post API:
API: http://localhost:4002/v1/products
Body Data: {
    "product": { 
        "product_name": "product_name", 
        "product_desc": "product_desc", 
        "units": "sku units", 
        "original_price": "original_price", 
        "selling_price": "selling_price", 
        "reviews": 0, 
        "ratings": 0, 
        "product_type": "product_type", 
        "product_image": "product_image_url"
    }
}

Get Product list API:
API: http://localhost:4002/v1/products

Get Product Detail API:
http://localhost:4002/v1/25812

DB MySql:
CREATE TABLE {db name}.products (
  `product_id` varchar(5) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_desc` longtext,
  `units` varchar(50) DEFAULT NULL,
  `original_price` varchar(8) DEFAULT NULL,
  `selling_price` varchar(8) DEFAULT NULL,
  `reviews` varchar(3) DEFAULT NULL,
  `ratings` varchar(1) DEFAULT NULL,
  `product_type` varchar(100) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `updated_on` date DEFAULT NULL,
  `created_on` date DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
