const debug = require('debug')('app:module_users_controller')
const { UsersService } = require('./services')
const {Response } = require('../common/response')
const createError = require('http-errors')

module.exports.UsersController = {
  getUsers: async(req, res) => {
    try {
      let users = await UsersService.getAll()
      Response.success(res, 200, 'Lista de Usuarios', users)
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  
  getUser: async (req, res) => {
    try {
      const {params: { id }, } = req
      let user = await UsersService.getById(id)
      if (!user) {
        Response.error(res, new createError.NotFound())
      } else {
        Response.success(res, 200, `Usuario ${id}`, usuario)
      }
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
  
  createUser: async (req, res) => {
    try {
      const { body } = req
      if (!body || Object.keys(body).length === 0 ) {
        Response.error(res, new createError.BadRequest())
      } else {
        const insertedId = await UsersService.createUser(body)
        Response.success(res, 201, "Usuario Agregado Correctamente", insertedId)
      }
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },

  updateUser: async (req, res) => {
    try {
      const {params: { id } } = req
      const {body} = req
      let user = await UsersService.getById(id)
      if (user) {
        let userUpdate = await UsersService.updateUser(id, body)
        if (!userUpdate) {
          Response.error(res, new createError.InternalServerError())
        } else {
          Response.success(res, 200, `Usuario ${id} actualizado correctamente `, Object(body))
        }
      } else {
        Response.error(res, new createError.NotFound())
      }
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },

  deleteUser: async (req, res) => {
    try {
      const {params: { id } } = req
      let user = await UsersService.getById(id)
      if (user) {
        const user = await UsersService.deleteUser(id)
        Response.success(res, 202, "Usuario Eliminado !!!", user)
      } else {
        Response.error(res, new createError.NotFound())
      }
    } catch (error) {
      debug(error)
      Response.error(res)
    }
  },
}