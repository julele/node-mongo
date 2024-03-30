const express = require('express');

const { ProductController } = require('./controller')

const router = express.Router();

module.exports.ProductsAPI = (app) => {
  router
    .get('/', ProductController.getProducts)     //http://localhost:3000/api/products/
    .get('/report', ProductController.generateReport) //lo pongo antes del get /:id 
    .get('/:id', ProductController.getProduct)  //http://localhost:3000/api/products/23
    .post('/', ProductController.createProduct)
    .put('/update/:id', ProductController.updateProduct)
    .delete('/delete/:id', ProductController.deleteProduct)
  app.use ('/api/products', router)
}