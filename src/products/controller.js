const debug = require('debug')('app:module_products_controller')
const { ProductsService } = require('./services')
const {Response } = require('../common/response')
const createError = require('http-errors')

module.exports.ProductController = {
  getProducts: async(req, res) => {
    try {
      let products = await ProductsService.getAll()
      Response.success(res, 200, 'Lista de Productos', products)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  getProduct: async (req, res) => {
    try {
      const {params: { id }, } = req
      let product = await ProductsService.getById(id)
      if (!product) {
        Response.error(res, new createError.NotFound())
      } else {
        Response.success(res, 200, `Producto ${id}`, product)
      }
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  
  createProduct: async (req, res) => {
    try {
      const { body } = req
      if (!body || Object.keys(body).length === 0 ) {
        Response.error(res, new createError.BadRequest())
      } else {
        const insertedId = await ProductsService.create(body)
        Response.success(res, 201, "Producto Agregado Correctamente", insertedId)
      }
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },

  updateProduct: async (req, res) => {
    try {
      const {params: { id } } = req
      const {body} = req
      let product = await ProductsService.getById(id)
      if (product) {
        let productUpdate = await ProductsService.update(id, body)
        if (!productUpdate) {
          Response.error(res, new createError.InternalServerError())
        } else {
          Response.success(res, 200, `Producto ${id} actualizado correctamente `, Object(body))
        }
      } else {
        Response.error(res, new createError.NotFound())
      }
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const {params: { id } } = req
      let product = await ProductsService.getById(id)
      if (product) {
        const product = await ProductsService.deleteProduct(id)
        Response.success(res, 202, "Producto Eliminado !!!", product)
      } else {
        Response.error(res, new createError.NotFound())
      }
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },

  generateReport: (req, res) => {
    try {
      ProductsService.generateReport('inventario',res)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  }
}