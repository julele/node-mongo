const debug = require('debug')('app:module_sales_controller')
const { SalesService } = require('./services')
const { ProductsService } = require('../products/services')
const { UsersService } = require('../users/services')
const {Response } = require('../common/response')
const createError = require('http-errors')

module.exports.SalesController = {
  getSales: async(req, res) => {
    try {
      let sales = await SalesService.getAll()
      Response.success(res, 200, 'Lista de Ventas', sales)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  getSale: async (req, res) => {
    try {
      const {params: { id }, } = req
      let sale = await SalesService.getById(id)
      if (!sale) {
        Response.error(res, new createError.NotFound())
      } else {
        Response.success(res, 200, `Venta ${id}`, sale)
      }
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },

  createSale: async (req, res) => {
    try {const { body } = req
      let cantidadVenta = req.body.cantidad
      let product = await ProductsService.getById(body.product)
      let user = await UsersService.getById(body.user)
      nuevaCantidad = product.cantidad - cantidadVenta
      if (!user || !product) {
          Response.error(res, new createError.NotAcceptable("Usuario o producto inexistente"))
      } else {
        if (product.cantidad >= cantidadVenta) {
          const insertedId = await SalesService.createSale(body)
          const productUp = await SalesService.updateProd(product._id, nuevaCantidad)
          Response.success(res, 201, `Venta Registrada`, insertedId)
        } else {
          Response.error(res, new createError.NotAcceptable("Cantidad de venta supera al stock"))
        }
      }
    } catch (error) {
      debug(error);
      res.status(500).json({ message: `interval server error create product in controller.js`});
    }
},

deleteProduct: async (req, res) => {
  try {
    const {params: { id } } = req
    let sale = await SalesService.getById(id)
    if (sale) {
      const saleDelete = await SalesService.deleteSale(id)
      Response.success(res, 202, "Producto Eliminado y restaurado Stock del producto !!!", saleDelete)
    } else {
      Response.error(res, new createError.NotFound())
    }
  } catch (error) {
    debug(error)
    Response.error(res)
  }
},

}