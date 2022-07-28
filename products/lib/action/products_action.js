const { ProductsModule } = require('../modules/products_module');
var debug = require('debug')('v1:product:actions');

var productsModule = new ProductsModule();

class ProductsAction {

    createProducts(event, context) {      
        var body_data = event.body;
        validate_data(event.body)       
        .then(function(_response) {
            debug("validate data ", _response);
            return productsModule.CreateProducts(body_data)
        })
        .then(function(response){
            if(response?.status && (response.status == 404))
            context.done(null, SendResponse(404, response))
            else
            context.done(null, SendResponse(200, response));
        })
        .catch(function(err){
            context.done(null, SendResponse(500, err));
        })
    }

    GetProducts(event, context) {    
        var query = event.queryParameters;
        validate_data(event)       
        .then(function(_response) {
            debug("validate data ", _response);
            return productsModule.GetProducts(query)
        })
        .then(function(response){
            if(response?.status && (response.status == 404))
            context.done(null, SendResponse(404, response))
            else
            context.done(null, SendResponse(200, response));
        })
        .catch(function(err){
            context.done(null, SendResponse(500, err));
        })
    }

    GetProductDetail(event, context) {      
        var product_id = event.pathParameters.product_id;
        validate_data(event)       
        .then(function(_response) {
            debug("validate data ", _response);
            return productsModule.GetProductDetail(product_id)
        })
        .then(function(response){
            if(response?.status && (response.status == 404))
            context.done(null, SendResponse(401, response))
            else
            context.done(null, SendResponse(200, response));
        })
        .catch(function(err){
            context.done(null, SendResponse(500, err));
        })
    }
}

function SendResponse(status, body) {
    var response = {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: status,
      body: JSON.stringify(body),
  
    };
    return response;
  };

function validate_data(data) {
    return new Promise((resolve, reject) => {
        return resolve(data);
    })
}
module.exports = {
    ProductsAction,
}