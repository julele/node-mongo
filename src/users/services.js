const { ObjectId } = require('mongodb')
const { Database } = require('../database/index')

const COLLECTION = 'users'

const getAll = async() => {
  const collection = await Database(COLLECTION)
  return await collection.find({}).toArray()
}
const getById = async(id) => {
  const collection = await Database(COLLECTION)
  const objectId = new ObjectId(id)
  return await collection.findOne({ _id: objectId })
}

const createUser = async(user) => {
  const collection = await Database(COLLECTION)
  let result = await collection.insertOne(user)
  return await result.insertedId
}

const updateUser = async (id, user) => {
  const collection = await Database(COLLECTION)
  const { _id, ...updateData } = user // Remove _id from user
  return collection.updateOne({ _id: new ObjectId(id)},{ $set: updateData })
}

const deleteUser = async (id) => {
  const collection = await Database(COLLECTION)
  return collection.deleteOne({ _id: new ObjectId(id)});
}

module.exports.UsersService = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser,
}