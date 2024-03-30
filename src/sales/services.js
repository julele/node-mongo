const { ObjectId } = require('mongodb')
const { Database } = require('../database/index')

const COLLECTION = 'sales';
const COLLECTION2 = 'products';

const getAll = async() => {
  const collection = await Database(COLLECTION)
  return await collection.find({}).toArray()
}
const getById = async(id) => {
  const collection = await Database(COLLECTION)
  const objectId = new ObjectId(id)
  return await collection.findOne({ _id: objectId })
}

const createSale = async (sale) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(sale);
  return result.insertedId;
};

//actualizar el stock del producto una vez registrada la venta
const updateProd = async (product, nuevaCantidad) => {
  const collection = await Database(COLLECTION2);
  return 
    collection.updateOne({ _id: new ObjectId(product) }, 
    { $set: { "cantidad": nuevaCantidad } });
}

const deleteSale = async (id) => {
  const collection = await Database(COLLECTION)
  const collection2 = await Database(COLLECTION2)
  const objectId = new ObjectId(id)
  const sale = await collection.findOne({ _id: objectId })
  const product = await collection2.findOne({ _id: new ObjectId(sale.product) })
  const nuevaCantidad = product.cantidad + sale.cantidad
  return Promise.all([
    collection2.updateOne(
      { _id: new ObjectId(sale.product)}, 
      { $set: { cantidad: nuevaCantidad } }),
    collection.deleteOne({ _id: new ObjectId(id)})
  ])
}

module.exports.SalesService = {
  getAll,
  getById,
  createSale,
  updateProd,
  deleteSale,
};