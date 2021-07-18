const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  title: String,
  description: String,
  thumbnail: String
}, {
  timestamps: true
});

const Category = mongoose.model('Category', CategorySchema);

const find = async function (query) {
  const data = await Category
  .find(query)
  .exec();

  const total = await Category.count(query);

  return {
    data,
    total
  }
}

const findById = function (id, cb) {
  Category.findById(id).exec(function (err, data) {
    cb(data);
  });
}

const create = function (inputs, cb) {
  const newCategory = new Category(inputs);

  return newCategory.save();
}

const update = function (id, newObject, cb) {
  Category.updateOne({ _id: id }, { $set: newObject }, function() {
    cb();
  });
}

const remove = function (id, cb) {
  Category.deleteOne({ _id: id }, function() {
    cb();
  });
}

module.exports = {
  find: find,
  findById: findById,
  create: create,
  update: update,
  remove: remove
};