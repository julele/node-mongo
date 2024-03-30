const { ObjectId } = require('mongodb')
const { Database } = require('../database/index')
const { ProductsUtils } = require('./utils')

const COLLECTION = 'products'

const getAll = async() => {
  const collection = await Database(COLLECTION)
  return await collection.find({}).toArray()
}
const getById = async(id) => {
  const collection = await Database(COLLECTION)
  const objectId = new ObjectId(id)
  return await collection.findOne({ _id: objectId })
}

const create = async(product) => {
  const collection = await Database(COLLECTION)
  let result = await collection.insertOne(product)
  return await result.insertedId
}

const generateReport = async(name, res) => {
  let products = await getAll()
  ProductsUtils.excelGenerator(products, name, res)
}

const update = async (id, product) => {
  const collection = await Database(COLLECTION)
  const { _id, ...updateData } = product // Remove _id from product
  return collection.updateOne({ _id: new ObjectId(id)},{ $set: updateData })
}

const deleteProduct = async (id) => {
  const collection = await Database(COLLECTION)
  return collection.deleteOne({ _id: new ObjectId(id)});
}

module.exports.ProductsService = {
  getAll,
  getById,
  create,
  generateReport,
  update,
  deleteProduct,
}