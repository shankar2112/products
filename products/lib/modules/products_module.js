const { ProductsDao } = require('../dao/products_dao');
var debug = require('debug')('v1:product:module');
var moment = require('moment-timezone');

function GetRandomProductsID() {
    try {
        var text = "";	// prefix
        var possible = "0123456789";
        var maxchars = 5;
      
        var prefixLen = text.length;
        var requiredLen = (maxchars - prefixLen);
      
        //console.log("Prefix length : ", text.length);
        for (var i = 0; i < requiredLen; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;   
    } catch (error) {
        return null
    }
  }

class ProductsModule {

    CreateProducts(data) {
        return new Promise(async (resolve, reject) => {
            var productdao = new ProductsDao();
            var read_connection = null;
            var today = new Date();
            var date = moment(today).utc().format("YYYY-MM-DD");
            try {
                read_connection = await productdao.getReadConnection();
                var product_data = data.product;
                var set_product_data = await categories_data_to_schema_product_data(product_data, date);
                var insert_product_data = await productdao.createProducts(read_connection, set_product_data);
                var response = { product: insert_product_data };
                if (read_connection) {
                    await productdao.releaseReadConnection(read_connection);
                }
                return resolve(response);
            }
            catch (error) {
                if (read_connection) {
                    await productdao.releaseReadConnection(read_connection);
                }
                return reject(error)
            }
        })
    }

    GetProductDetail(product_id) {
        return new Promise(async(resolve, reject) => {
            var productdao = new ProductsDao();
            var connection = null;
            
            try {
                connection = await productdao.getReadConnection();
                var product = await productdao.getProductDetailById(connection, product_id);
                if(product.hasOwnProperty('status') && product.status == 404) {
                    if (connection) {
                        await productdao.releaseReadConnection(connection);
                    }
                    return resolve(product);
                }
                else{
                    if (connection) {
                        await productdao.releaseReadConnection(connection);
                    }
                    return resolve(product)
                }
            }
            catch(error) {
                if (connection) {
                    await productdao.releaseReadConnection(connection);
                }
                return reject(error)
            }
        })
    }

    GetProducts(query) {
        return new Promise(async(resolve, reject) => {
            var productdao = new ProductsDao();
            var connection = null;
            try {
                connection = await productdao.getReadConnection();
                debug("query.filter", query)
                var products = await productdao.getProducts(connection, query);
                if(products.hasOwnProperty('status') && products.status == 404) {
                    if (connection) {
                        await productdao.releaseReadConnection(connection);
                    }
                    var retval = {
                        summary: {
                            filteredsize: 0, resultsize: 0, totalsize: 0    
                        }, 
                        results: []
                    }
                    return resolve(retval);
                }
                else{
                    var products_count = await productdao.getProductsCounts(connection, query);
                    var total_size = products_count;
                    var page_size = query.skip ? query.skip : products_count;
                    var result_size = products.length;
                    var summary = {
                        filteredsize: page_size, resultsize: result_size, totalsize: total_size
                    };
                    var res = {
                        summary, results: products
                    }
                    if (connection) {
                        await productdao.releaseReadConnection(connection);
                    }
                    return resolve(res)
                }
            }
            catch(error) {
                if (connection) {
                    await productdao.releaseReadConnection(connection);
                }
                return reject(error)
            }
        })
    }
}

function categories_data_to_schema_product_data(data, date){
    return new Promise(async(resolve, reject) => {
        try {
            var product_id = await GetRandomProductsID();
            var product_data = { 
                product_id: product_id, 
                product_name: data.product_name, 
                product_desc: data.product_desc, 
                units: data.units, 
                original_price: data.original_price, 
                selling_price: data.selling_price, 
                reviews: data.reviews, 
                ratings: data.ratings, 
                product_type: data.product_type, 
                product_image: data.product_image, 
                updated_on: date, 
                created_on: date
            }
            return resolve(product_data)
        }
        catch (error) {
            return reject(error);    
        }
    })
}

module.exports = {
   ProductsModule
}