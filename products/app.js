const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const aqp = require('api-query-params');
const { ProductsAction } = require('./lib/action/products_action');

var event = {
  stageVariables: {
    'env': process.env.ENV
  }
}

var productsAction = new ProductsAction();

app.post('/products', function (req, res) {
  event.headers = req.headers;
  event.body = req.body;
  productsAction.createProducts(event, {
    done: function (rescode, resmsg) {
      res.header(resmsg.headers);
      res.status(resmsg.statusCode);
      res.send(resmsg.body)
    }
  })
})

app.get('/products', function (req, res){
  event.header = req.headers;
  event.pathParameters = req.params;
  event.queryParameters = aqp(req.query);
  productsAction.GetProducts(event, {
    done: function (rescode, resmsg) {
      res.header(resmsg.headers);
      res.status(resmsg.statusCode);
      res.send(resmsg.body)
    }
  })  
})

app.get('/:product_id', function (req, res){
  event.header = req.headers;
  event.pathParameters = req.params;
  productsAction.GetProductDetail(event, {
    done: function (rescode, resmsg) {
      res.header(resmsg.headers);
      res.status(resmsg.statusCode);
      res.send(resmsg.body)
    }
  })  
})

module.exports = app;