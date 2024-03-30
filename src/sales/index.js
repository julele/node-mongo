const express = require('express');

const { SalesController } = require('./controller')

const router = express.Router();

module.exports.SalesAPI = (app) => {
  router
    .get('/', SalesController.getSales)    
    .get('/:id', SalesController.getSale) 
    .post('/', SalesController.createSale)
    .delete('/delete/:id', SalesController.deleteProduct)

  app.use ('/api/sales', router)
}